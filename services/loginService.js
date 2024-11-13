const database = require('../databaseDao');
const errors = require('../helper/errors');
const jwt = require('jsonwebtoken');
const { message } = require('../helper/message');
const { encryptData } = require('../helper/crypto');
const { decryptData } = require('../helper/crypto');

const jwtKey = 'abcdefgdjkjhgjhjh3234343@4345ghgh'
const jwtExpirySeconds = 300


class loginService {

    async loginUser(queryData) {

        return new Promise(async (resolve, reject) => {
            try {
                let myInfo = {
                    userName: queryData.UserName,
                    password: queryData.password
                }
                const result = await database.userDao.checkUserCredientials(myInfo.userName, myInfo.password);
                if (!result[0]) {
                    return resolve({ status: 404, success: false, message: message.NOT_FOUND })
                } 
                if (result[0].IsActive === 0) { 
                    return resolve({status: 400, success: false, message: message.ACCOUNT_DEACTIVATE})
                }else {
                    const decryptPassword = await decryptData(result[0].Password);
                    if (decryptPassword !== queryData.password) {
                        return resolve({ status: 401, success: false, message: message.UN_AUTHORIZED })
                    }
                    myInfo.Id = result[0].Id,
                    myInfo.IsActive = result[0].IsActive
                    const authToken = jwt.sign(myInfo, jwtKey, {
                        algorithm: 'HS256',
                        expiresIn: "12h"
                    })
                    resolve({ status:200, success: true, authToken, IsActive: myInfo.IsActive, UserId: myInfo.Id, CompanyId: result[0].CompanyId });
                }

            } catch (e) {
                reject(e);
            }
        })
    }
  
}

module.exports = new loginService();
