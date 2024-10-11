const dataBaseDao = require('../databaseDao');

class supplierDataService {
    async getAllSupplierData() {
        try {
            const result = await dataBaseDao.getSupplierData.getAllSupplierDataDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
}


module.exports = new supplierDataService();