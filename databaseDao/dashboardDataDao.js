const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class dashboardDataDao {
    async getdashboardDataDao() {
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
    async getmonthWiseRevenueDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `SELECT 
                            YEAR(p.UpdatedAt) AS Year,
                            MONTH(p.UpdatedAt) AS Month,
                            SUM(CASE 
                                    WHEN p.PStatus = 1 THEN p.SurveyClientCost 
                                    ELSE 0 
                                END) AS TotalRevenue
                        FROM 
                            tsplatform.participants AS p
                        WHERE 
                            p.UpdatedAt >= DATEADD(MONTH, -6, GETDATE()) -- Last 6 months
                        GROUP BY 
                            YEAR(p.UpdatedAt), 
                            MONTH(p.UpdatedAt)
                        ORDER BY 
                            Year DESC, 
                            Month DESC;`;

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
    async getweeklyRevenueDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `WITH WeeklyRevenue AS (
    SELECT 
        'CurrentWeek' AS WeekLabel,
        SUM(CASE 
                WHEN p.PStatus = 1 THEN p.SurveyClientCost 
                ELSE 0 
            END) AS TotalRevenue
    FROM 
        tsplatform.participants AS p
    WHERE 
        CAST(p.updatedAt AS DATE) = CAST(GETDATE() AS DATE) -- Get revenue only for today (Monday)
        
    UNION ALL

    SELECT 
        'LastWeek' AS WeekLabel,
        SUM(CASE 
                WHEN p.PStatus = 1 THEN p.SurveyClientCost 
                ELSE 0 
            END) AS TotalRevenue
    FROM 
        tsplatform.participants AS p
    WHERE 
        DATEPART(WEEK, p.updatedAt) = DATEPART(WEEK, DATEADD(WEEK, -1, GETDATE())) 
        AND DATEPART(YEAR, p.updatedAt) = DATEPART(YEAR, DATEADD(WEEK, -1, GETDATE()))
)

SELECT 
    CurrentWeek.TotalRevenue AS CurrentWeekRevenue,
    LastWeek.TotalRevenue AS LastWeekRevenue,
    (CurrentWeek.TotalRevenue - LastWeek.TotalRevenue) AS RevenueDifference
FROM 
    (SELECT TotalRevenue FROM WeeklyRevenue WHERE WeekLabel = 'CurrentWeek') AS CurrentWeek,
    (SELECT TotalRevenue FROM WeeklyRevenue WHERE WeekLabel = 'LastWeek') AS LastWeek;`;

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