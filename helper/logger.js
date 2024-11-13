const { createLogger, format, transports } = require('winston');

// Define the logger configuration
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    // Log to a file
    new transports.File({ filename: 'app.log' })
  ]
});


module.exports = logger;