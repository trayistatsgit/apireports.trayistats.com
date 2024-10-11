const { Helper } = require('../helper');
const service = require('../services');

class supplierController {
    async getAllSuppliers(request, response) {
        try {
            const result = await service.supplierService.getAllSupplierData(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
}

module.exports = new supplierController();