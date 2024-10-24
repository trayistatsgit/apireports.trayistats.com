const { Helper } = require('../helper');
const service = require('../services');

class customerController {
    async getAllCustomers(request, response) {
        try {
            const result = await service.customerService.getAllCustomerData(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
}

module.exports = new customerController();