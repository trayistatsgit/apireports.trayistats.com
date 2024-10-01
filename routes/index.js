const express = require("express");
const router = express.Router();

const dashboardController =  require("../controllers");

router.get('/api/V1/currentDashboardData', dashboardController.dashboardDataController.getDashboardCurrentData);


module.exports =  router;