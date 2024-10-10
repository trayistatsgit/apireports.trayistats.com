const getDashboardData = require('./dashboardDataDao');
const common = require('./common/verifyVendor');
const getSupplierData = require('./supplierDataDao')

module.exports = {
    getDashboardData,
    getSupplierData,
    common
};
