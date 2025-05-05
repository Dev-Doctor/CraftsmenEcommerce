const crypto = require('crypto');

const DataUtils = {
    // generates a random array of 64 byes and converts it to hexadecimal
    GenerateToken() {
        return crypto.randomBytes(64).toString('hex');
    }
}

module.exports = DataUtils;