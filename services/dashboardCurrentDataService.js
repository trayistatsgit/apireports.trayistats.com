const dashobardData = require('../databaseDao');

class dashboardCurrentDataService {
    async getDashboardCurrentData() {
        try {
            const result = await dashobardData.getDashboardData.getdashboardDataDao();
            return {ItemCount : result.length, Records : result}
        } catch (error) {
            throw new Error('Error fetching allocated surveys');     
        }
    }
}

module.exports = new dashboardCurrentDataService();