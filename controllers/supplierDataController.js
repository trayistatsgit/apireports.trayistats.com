const { Helper } = require('../helper');
const service = require('../services');

class supplierDataController {
    async getSupplierData(request, response) {
        try {
            const result = await service.supplierData.getSupplierData(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
    async getSupplierReconcilationData(request, response) {
        try {
            const result = await service.supplierData.getSupplierReconcilationData(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
}

module.exports = new supplierDataController();