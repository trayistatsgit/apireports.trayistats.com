const express = require("express");
const router = express.Router();

const controller = require("../controllers");

router.get('/api/V1/currentDashboardData', controller.dashboardDataController.getDashboardCurrentData);
router.get('/api/V1/monthWiseRevenue', controller.dashboardDataController.getmonthWiseRevenue);
router.get('/api/V1/weeklyRevenue', controller.dashboardDataController.getweeklyRevenue);
router.get('/api/V1/getAllSuppliers', controller.supplierController.getAllSuppliers);
router.get('/api/V1/getAllCustomers', controller.customerController.getAllCustomers);
router.get('/api/V1/getSupplierData', controller.supplierDataController.getSupplierData);
router.get('/api/V1/getSupplierReconcilationData', controller.supplierDataController.getSupplierReconcilationData);

module.exports = router;