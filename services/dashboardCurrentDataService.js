const databaseDao = require('../databaseDao');

class dashboardCurrentDataService {
    async getDashboardCurrentData() {
        try {
            const result = await databaseDao.getDashboardData.getdashboardDataDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
    async getmonthWiseRevenue() {
        try {
            const result = await databaseDao.getDashboardData.getmonthWiseRevenueDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
    async getweeklyRevenue() {
        try {
            const result = await databaseDao.getDashboardData.getweeklyRevenueDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
}

module.exports = new dashboardCurrentDataService();