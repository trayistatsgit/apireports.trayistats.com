const getDashboardData = require('./dashboardDataDao');
const common = require('./common/verifyVendor');
const getSupplierData = require('./supplierDataDao');
const getCustomerData = require('./customerDataDao');
const getSupplierAllData = require('./getSupplierAllData');

module.exports = {
    getDashboardData,
    getSupplierData,
    getCustomerData,
    getSupplierAllData,
    common
};
