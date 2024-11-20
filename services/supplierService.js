const dataBaseDao = require('../databaseDao');

class supplierData {
    async getSupplierData({ supplierName, customerName, lanCode, startDate, endDate }) {
        try {
            const result = await dataBaseDao.getSupplierAllData.getSupplierDataDao({
                supplierName,
                customerName,
                lanCode,
                startDate,
                endDate
            });
    
            return { ItemCount: result.length, Records: result };
        } catch (error) {
            throw new Error('Error fetching supplier data');
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