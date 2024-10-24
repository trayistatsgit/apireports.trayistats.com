const dataBaseDao = require('../databaseDao');

class supplierData {
    async getSupplierData() {
        try {
            const result = await dataBaseDao.getSupplierAllData.getSupplierDataDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
    async getSupplierReconcilationData() {
        try {
            const result = await dataBaseDao.getSupplierAllData.getSupplierReconcilationDataDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
}


module.exports = new supplierData();