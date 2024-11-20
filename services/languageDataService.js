const dataBaseDao = require('../databaseDao');

class languageDataService {
    async getAllLanguageData() {
        try {
            const result = await dataBaseDao.getLanguageData.getAllLanguageDataDao();
            return { ItemCount: result.length, Records: result }
        } catch (error) {
            throw new Error('Error fetching allocated surveys');
        }
    }
}


module.exports = new languageDataService();