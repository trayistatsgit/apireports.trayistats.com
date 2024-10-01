const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class dashboardDataDao {
    async getdashboardDataDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `SELECT count(Id) 
             FROM tsplatform.participants
             WHERE CAST(createdAt AS DATE) = CAST(GETDATE() AS DATE)`;

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
}

module.exports = new dashboardDataDao();