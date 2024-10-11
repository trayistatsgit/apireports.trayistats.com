const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class supplierDataDao {
    async getAllSupplierDataDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `Select Name from tsplatform.vendor where isActive = 1`;

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
}

module.exports = new supplierDataDao();