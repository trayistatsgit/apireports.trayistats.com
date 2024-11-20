const errors = require('../helper');
const { execute } = require('../config/database/querywrapperMysql');

class languageDataDao {
    async getAllLanguageDataDao() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `Select LangCode from tsplatform.language where isActive = 1 order by LangCode ASC;`;

                let result = await execute(query, [], 1);
                resolve(result);
            } catch (error) {
                errors.errors['003'].reasone = error.message;
                reject(errors.errors['003']);
            }
        })
    }
}

module.exports = new languageDataDao();