const errors = require('../helper/errors');
const { execute } = require("../config/database/querywrapperMysql");
// const roleDao = require('./roleDao');
// const { encryptData } = require('../Helper/crypto');
// const common = require('./common');
// const { message } = require('../Helper/message');
class UserDao {

    async checkUserCredientials(userName) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `SELECT TOP 1  * from tsplatform.users Where UserName = ? and IsActive = 1`;
                let result = await execute(query, [userName], 1);
                resolve(result);
            } catch (error) {
                errors.errors["003"].message = error.message;
                reject(errors.errors["003"]);
            }
        })
    };
    
    async getUserIsActiveDao(Id) {
        try {
            let Id = 1;
            let query = `SELECT TOP 1 Id from dbo.users Where Id = ? and IsActive = 1`;
            const result = await execute(query, [Id], 1);
            return result;
        } catch (error) {
            throw error;
        }
    }        
}

module.exports = new UserDao();
