const dataBaseDao = require('../databaseDao');

class supplierDataService {
    async getSupplierData() {
        try {
            const result = await dataBaseDao.getSupplierData.getSupplierDataDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
}


module.exports = new supplierDataService();