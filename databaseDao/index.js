const userDao = require('./userDao');
const getDashboardData = require('./dashboardDataDao');
const common = require('./common/verifyVendor');
const getSupplierData = require('./supplierDataDao');
const getCustomerData = require('./customerDataDao');
const getLanguageData = require('./languageDataDao');;
const getSupplierAllData = require('./getSupplierAllData');

module.exports = {
    userDao,
    getDashboardData,
    getSupplierData,
    getCustomerData,
    getLanguageData,
    getSupplierAllData,
    common
};
