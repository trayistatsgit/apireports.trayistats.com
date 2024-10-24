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
                let query = `WITH Counts AS (
    SELECT 
        COUNT(id) AS total_count
    FROM 
        tsplatform.participants 
    WHERE 
        pstatus = 1 
        AND CreatedAt BETWEEN 
            DATEADD(DAY, 1 - DAY(EOMONTH(GETDATE(), -1)), EOMONTH(GETDATE(), -1)) 
            AND EOMONTH(GETDATE(), -1)
),
StatusSum AS (
    SELECT 
        SUM(CASE 
                WHEN pstatus != 1 AND finalstatus = 31 THEN 1
                WHEN pstatus = 1 AND finalstatus = 25 THEN -1
                ELSE 0
            END) AS status_sum
    FROM 
        tsplatform.participants 
    WHERE 
        CreatedAt BETWEEN 
            DATEADD(DAY, 1 - DAY(EOMONTH(GETDATE(), -1)), EOMONTH(GETDATE(), -1)) 
            AND EOMONTH(GETDATE(), -1)
)
SELECT 
    COALESCE((CAST(ss.status_sum AS FLOAT) / c.total_count) * 100, 0) AS reconcile_percentage
FROM 
    Counts c
CROSS JOIN 
    StatusSum ss;`



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