const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class supplierDataDao {
    async getSupplierDataDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `SELECT 
                        COUNT(Id) AS TotalParticipants,
                        COUNT(CASE WHEN pStatus = 1 THEN 1 END) AS CompletedParticipants,
                        SUM(CASE WHEN pStatus = 1 THEN SurveyClientCost ELSE 0 END) AS TotalRevenue,
                        CASE 
                            WHEN COUNT(Id) = 0 THEN 0  -- Prevent division by zero
                            ELSE (COUNT(CASE WHEN pStatus = 1 THEN 1 END) * 100.0 / COUNT(Id)) 
                        END AS ConversionRate
                    FROM 
                        tsplatform.participants
                    WHERE 
                        CAST(updatedAt AS DATE) = CAST(GETDATE() AS DATE);`;

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
}

module.exports = new supplierDataDao();