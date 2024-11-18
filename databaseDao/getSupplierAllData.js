const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class getSupplierAllData {
    async getSupplierDataDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `Select Name from tsplatform.vendor where isActive = 1 ORDER BY Name ASC`;

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
    async getSupplierReconcilationDataDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `SELECT 
                                (CAST(
                                    COUNT(CASE WHEN finalstatus = 25 THEN 1 END) AS FLOAT
                                ) / COUNT(*)) * 100 AS reconcile_percentage
                            FROM tsplatform.participants 
                            WHERE 
                                PStatus = 1 
                                AND CreatedAt >= DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()) - 1, 0)
                                AND CreatedAt < DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0)`

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
}

module.exports = new getSupplierAllData();