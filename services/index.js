const loginService = require('./loginService');
const dashboardDataService = require('./dashboardCurrentDataService');
const supplierService = require('./supplierDataService');
const customerService = require('./customerDataService');
const languageService = require('./languageDataService');
const supplierData = require('./supplierService')

module.exports = {
    loginService,
    dashboardDataService,
    supplierService,
    customerService,
    languageService,
    supplierData
}
