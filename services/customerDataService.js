const dataBaseDao = require('../databaseDao');

class customerDataService {
    async getAllCustomerData() {
        try {
            const result = await dataBaseDao.getCustomerData.getAllCustomerDataDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
}


module.exports = new customerDataService();