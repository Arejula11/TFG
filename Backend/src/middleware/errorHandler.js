// src/middleware/errorHandler.js

// Import required modules for logging
const winston = require('winston');

// Configure winston for logging
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        // Uncomment to log to a file
        // new winston.transports.File({ filename: 'error.log' })
    ],
});

// Middleware to handle errors
const errorMiddleware = (err, req, res, next) => {
    // Log the error details for debugging purposes
    logger.error({
        message: err.message,
        code: err.code,
        stack: err.stack,
        timestamp: new Date().toISOString()
    });

    // Check for specific PostgreSQL error codes
    if (err.code) {
        switch (err.code) {
            case '23505': // unique_violation
                return res.status(409).json({ error: `Duplicate entry, unique constraint violated.` });
            case '23503': // foreign_key_violation
                return res.status(400).json({ error: `Foreign key constraint violation.` });
            case '42601': // syntax_error
                return res.status(400).json({ error: `Syntax error in SQL query.` });
            default:
                return res.status(500).json({ error: `Database error, please try again later.` });
        }
    }

    // Default to 500 Internal Server Error for other errors
    res.status(500).json({ error: `Internal Server Error. Status code: 500, Error code: ${err.code}` });
};

module.exports = errorMiddleware;