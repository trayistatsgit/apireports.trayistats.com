const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class customerDataDao {
    async getAllCustomerDataDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `Select ClientName from tsplatform.client where isActive = 1 ORDER BY ClientName ASC`;

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
}

module.exports = new customerDataDao();