const { Helper } = require('../helper');
const service = require('../services');

class languageController {
    async getAllLanguages(request, response) {
        try {
            const result = await service.languageService.getAllLanguageData(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
}

module.exports = new languageController();