const { Helper } = require('../helper');
const service = require('../services');

class dashboardDataController {
    async getDashboardCurrentData(request, response) {
        try {
            const result = await service.dashboardDataService.getDashboardCurrentData(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
    async getmonthWiseRevenue(request, response) {
        try {
            const result = await service.dashboardDataService.getmonthWiseRevenue(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
    async getweeklyRevenue(request, response) {
        try {
            const result = await service.dashboardDataService.getweeklyRevenue(request);
            Helper.responseJsonHandler(null, result, response);

        } catch (error) {
            Helper.responseJsonHandler(error, null, response);
        }
    }
}

module.exports = new dashboardDataController();