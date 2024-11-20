const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class getSupplierAllData {
    async getSupplierDataDao({ supplierName, customerName, lanCode, startDate, endDate }) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `
                    WITH
    ParticipantCounts AS (
        SELECT
            COUNT(p.Id) AS count,
            p.PStatus,
            ps.Name AS PstatusName,
            l.LangCode,
            v.Name AS VendorName -- Added VendorName for grouping
        FROM tsplatform.participants AS p
        LEFT JOIN tsplatform.surveys AS s ON s.SurveyGUID = p.SurveyId
        LEFT JOIN tsplatform.participantstatus AS ps ON ps.mCase = p.PStatus
        LEFT JOIN tsplatform.client AS c ON c.clientguid = p.clientid
        LEFT JOIN tsplatform.vendor AS v ON v.vendorguid = p.vendorId
        LEFT JOIN tsplatform.language AS l ON s.LangId = l.Id
        WHERE 1 = 1
            AND v.Name NOT IN ('Testing For billing1', 'Internal Company') -- Exclude specific vendors
            /* Dynamic Filters */
            AND (${startDate ? `p.CreatedAt >= '${startDate.toISOString().split('T')[0]}'` : '1=1'})
            AND (${endDate ? `p.CreatedAt <= '${endDate.toISOString().split('T')[0]}'` : '1=1'})
            AND (${supplierName ? `v.Name LIKE '%${supplierName}%'` : '1=1'})
            AND (${customerName ? `c.ClientName LIKE '%${customerName}%'` : '1=1'})
            AND (${lanCode ? `l.LangCode = '${lanCode}'` : '1=1'})
        GROUP BY p.PStatus, ps.Name, l.LangCode, v.Name
    ),
    TotalCount AS (
        SELECT
            VendorName,
            SUM(count) AS total_participants
        FROM ParticipantCounts
        GROUP BY VendorName
    ),
    OverallTotal AS (
        SELECT
            SUM(count) AS grand_total_count,
            SUM(CASE WHEN PStatus = 1 THEN count ELSE 0 END) AS total_completed_count
        FROM ParticipantCounts
    )
SELECT
    pc.VendorName,               -- Vendor name
    pc.PStatus,                  -- Participant status
    pc.PstatusName,              -- Participant status name
    SUM(pc.count) AS total_status_count, -- Total count for the given status
    CAST(
        (SUM(pc.count) * 100.0 / tc.total_participants) AS DECIMAL(5, 2)
    ) AS percentage,             -- Percentage of total status for the vendor
    tc.total_participants AS overall_total_count,
    ot.total_completed_count AS overall_completed_count,
    CAST(
        (ot.total_completed_count * 100.0 / ot.grand_total_count) AS DECIMAL(5, 2)
    ) AS overall_conversion_rate -- Conversion rate for all vendors
FROM ParticipantCounts pc
JOIN TotalCount tc ON pc.VendorName = tc.VendorName
CROSS JOIN OverallTotal ot
GROUP BY
    pc.VendorName, pc.PStatus, pc.PstatusName, tc.total_participants, ot.total_completed_count, ot.grand_total_count
ORDER BY
    pc.VendorName, pc.PStatus`;
                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reason = error.message;
                reject(errors.errors['003']);
            }
        });
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