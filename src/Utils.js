const crypto = require('crypto');
const queries = require('./queries');

const DataUtils = {
    // generates a random array of 64 byes and converts it to hexadecimal
    GenerateToken() {
        return crypto.randomBytes(64).toString('hex');
    }
}

const DbUtils = {
    async GetUserDataById(client, user_id) {
        const result = await client.query(queries.USER_BY_ID, [user_id]);
        
        if(result.rows.length < 1) {
            return undefined;
        }

        return result;
    },

    async GetUserDataByEmail(client, email) {
        const result = await client.query(queries.USER_BY_EMAIL, [email]);
        
        if(result.rows.length < 1) {
            return undefined;
        }

        return result;
    },

    async DeleteToken(client, token) {
        const result = await client.query(queries.DELETE_TOKEN, [token]);
    }
}

module.exports = { DataUtils, DbUtils };