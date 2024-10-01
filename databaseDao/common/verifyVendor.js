const { execute } = require("../../config/database/querywrapperMysql");

class common {
    async verifyVendorWithHeader(headerKey) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `Select top 1 * from dbo.vendor where AccessKey = ? and IsActive = 1;`
                let result = await execute(query, [headerKey], 1);
                resolve(result)
            } catch (error) {
                resolve([])
            }
        })
    }

}

module.exports = new common();