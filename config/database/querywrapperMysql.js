const mysql = require('./databaseSetupMysql');
const mssql = require('mssql');
const SqlString = require('tsqlstring');
const { pool } = require('./mssqlpool');

async function getConnection(){
    return new Promise((resolve, reject) => {
        mysql.pool.getConnection(function (err, connection) {
          if (err) {
            reject(err);
          } else {
            resolve(connection);
          }
        });
      });
}

async function getMSSQLConnection(){
  return new Promise((resolve, reject) => {
    const poolToConnect = new mssql.ConnectionPool(mysql.mssql);
    // Increase the limit for the pool's EventEmitter
    poolToConnect.setMaxListeners(50);

    // mssql.connect(mysql.mssql)
    poolToConnect.connect().then(pool=>{
      resolve(pool);
    }).catch(error=>{
      reject(error);
    });
    });
}


exports.execute = async function (query, bindValuesArray, queryType) {
  return new Promise(async (resolve, reject) => {
    let queryToDB = ``;
    try {
      //const connection = await getMSSQLConnection();

      let sqlQuery    = SqlString.format(query, bindValuesArray);

      if(queryType == 5 || queryType == 6){
        sqlQuery = `${sqlQuery}; SELECT CAST(scope_identity() AS int) as insertId;`
      }
console.log(sqlQuery)
      queryToDB = sqlQuery;
      let result =  await pool.request().query(sqlQuery);
      //connection.close();

      let resultData = [];
      if(queryType == 1 ){ // Single query to fetch records
        resultData = result.recordset;
      } else if(queryType == 2 ){ // Multi query to fetch records
        resultData = result.recordsets;
      } else if(queryType == 3 ){ // update query
        resultData.affectedRows = result.rowsAffected[0];
      } else if(queryType == 4 ){ // Delete query
        resultData.affectedRows = result.rowsAffected[0];
      } else if(queryType == 5 || queryType == 6){ //Insert Query
        resultData.insertId = result.recordset[0].insertId;
      } else if(queryType == 7 ){ // update multiple Query query
        
        for(let m = 0; m < result.rowsAffected.length; m++ ){
          resultData.push({
            affectedRows : result.rowsAffected[m]
          })
        }
      } else {
        // Default Query , return recordset
        resultData = result.recordset;
      }

      resolve(resultData);

    } catch (e) {
      logErrorsToDB(queryToDB, e);
      reject(e);
    }
  });  
}

async function logErrorsToDB(query, error){
  return new Promise(async (resolve, reject) => {
    try {
        const connection = await getConnection();
        let dataToInsert = [[query, "QueryError-SUPPLYAPI-MSSQL", error, new Date(), '']]
        let queryToInsert = `INSERT INTO sqlerrorlogging_expose ( query, data, error, createdAt, queryValues ) VALUES  ? ;`;
        
        connection.query(queryToInsert, [dataToInsert], function (err, result) {
          connection.release();
        });

    } catch (e) {
        reject(e);
    }
  });  
}

exports.insertApiLog = async function (logData) {
  let connection;
  
  try {
    connection = await getConnection();

    const query = `
      INSERT INTO SupplyApiLogs (apiEndpoint, response, createdAt, vendorId, queryData, ipAddress) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const itemCount = logData.response?.ResponseData?.ItemCount || null;
    const params = [
      logData.apiEndpoint,
      JSON.stringify({ itemCount }),
      logData.createdAt,
      logData.vendorId,
      JSON.stringify(logData.queryParameters),
      logData.ipAddress
    ];


    const result = await new Promise((resolve, reject) => {
      connection.query(query, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    return result;

  } catch (err) {
    if (connection) {
      const errorLogQuery = `
        INSERT INTO sqlerrorlogging_expose (query, data, error, createdAt, queryValues) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const errorLogData = [
        query, 
        "QueryError-SUPPLYAPI", 
        err.message, 
        new Date(), 
        JSON.stringify(params)
      ];

      try {
        await new Promise((resolve, reject) => {
          connection.query(errorLogQuery, [errorLogData], (errorLogErr, errorLogResult) => {
            if (errorLogErr) console.error('Error logging to sqlerrorlogging_expose:', errorLogErr);
            resolve();  
          });
        });
      } catch (logError) {
        console.error("Failed to insert into error log:", logError);
      }
    }
    throw err;
  } finally {
    if (connection) connection.release();
  }
};



exports.executeOld = async function (query, bindValuesArray) {
    return new Promise(async (resolve, reject) => {
        try {
          const connection = await getConnection();
          connection.query(query, bindValuesArray, function (err, result) {
            if (err) {
              const queryValues = JSON.stringify(bindValuesArray)
              let dataToInsert = [[query, "QueryError-PSAPI", err, new Date(), queryValues]]
              let queryToInsert = `INSERT INTO sqlerrorlogging_expose ( query, data, error, createdAt, queryValues ) VALUES  ? ;`;
              connection.query(queryToInsert, [dataToInsert], function (err, result) {
                connection.release();
              });   
                reject(err);
            } else {
                connection.release();
                resolve(result);
            }
          });
        } catch (e) {
            reject(e);
        }
      });    
}

