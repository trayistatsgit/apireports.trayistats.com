const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const surveyRoutes = require('./routes/index');
const database = require("./databaseDao/index");

// Middleware to parse JSON bodies
app.use(express.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


// Middleware for checking authorization and logging requests
// app.use(async function (req, res, next) {
//     let headerAuth = req.get("userAccessKey");
//     if (!headerAuth) {
//         res.status(401).send({
//             success: false,
//             message: 'unauthorised access'
//         });
//         return;
//     }

//     // Check for authorization header validity
//     let dbResult = await database.common.verifyVendorWithHeader(headerAuth);
//     if (dbResult.length == 0 || (dbResult.length === 1 && dbResult[0].IsActive === 0)) {
//         res.status(403).send({
//             success: false,
//             message: 'forbidden'
//         });
//         return;
//     }

//     req.vendorData = dbResult[0];
//     next();
// });


app.use(surveyRoutes);

// 404 handler
app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling
process
    .on('unhandledRejection', (reason, p) => {
        console.log(reason);
    })
    .on('uncaughtException', err => {
        console.log(err);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
