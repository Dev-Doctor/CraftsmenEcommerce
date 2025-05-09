const fs = require('fs');
const path = require('path');

// define and check if the logs folder is present
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) { fs.mkdirSync(logsDir) };

/**
 * @returns the current day date as a string | e.g. format: '2069-06-09'
 */
function getDataStamp() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Logs a message to both the console and a daily log file.
 * 
 * The log format in file: [HH:MM:SS] [LEVEL] message
 * Example: [13:07:20] [ERROR] Something went wrong
 * 
 * @param {String} level - The log level ('info', 'warn', 'error');
 * @param {String} message - The main log message to record;
 * @param {JSON} [meta] - Optional metadata object (e.g. for errors);
 */
function log(level, message, meta) {
    // Get the current time in HH:MM:SS format
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];

    // prepare the log file path (e.g. logs/2025-05-09.log)
    const logFile = path.join(logsDir, `${getDataStamp()}.log`);

    // construct the log line
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

    // output to console based on log level
    if (level == 'error') {
        console.error(logEntry.trim(), meta.error);
    } else if (level == 'warn') {
        console.warn(logEntry.trim());
    } else {
        console.log(logEntry.trim());
    }

    // Append the log entry to the daily log file
    fs.promises.appendFile(logFile, logEntry).catch(err =>
        console.error("loggin Error!", err)
    );
}

/**
 * Generates a formatted string describing an incoming API request.
 * 
 * The msg format is: Request => METHOD ROUTE from IP
 * Example: Request => GET /login from 127.0.0.1
 * 
 * @param {Request} req - The express request object;
 *  
 * @returns {string} => A formatted string with method, URL, and IP.
 */
function apiRequstMsg(req) {
    return `Request => ${req.method} ${req.url} from ${req.ip}`;
}

/**
 * Generates a formatted string describing an incoming API request.
 * @param {Request} req - The express request object;
 *  
 * @returns {string} => A formatted string with method, URL, and IP.
 * @example
 * // Request => GET /login from 127.0.0.1
 */
function apiErrorMsg(req, status_code) {
    return `Request Error => ${req.method} ${req.url} from ${req.ip} with error code [${status_code}]`
}

module.exports = {
    info: (msg) => log('info', msg, undefined),
    warn: (msg) => log('warn', msg, undefined),
    error: (msg, meta) => log('error', msg, meta),
    apiRequstMsg
}