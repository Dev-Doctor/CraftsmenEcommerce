const crypto = require('crypto');
const queries = require('./queries');

/**
 * Data Utility functions
 */
const DataUtils = {
    /**
     * Generates a random array of 64 byes and converts it to hexadecimal.
     * @returns the generated string converted
     */
    GenerateToken() {
        return crypto.randomBytes(64).toString('hex');
    },

    /**
     * Checks if the given email address is valid using a simplified regex pattern.
     * <p>
     * This method currently uses a regex pattern to validate the email address format:
     * <pre>
     *     ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
     * </pre>
     * which covers most common cases of valid email addresses. It ensures that the email has the
     * following structure: local part, `@` symbol, domain part, and a top-level domain.
     * </p>
     * <p>
     * <b>Important:</b><br>
     * The <a href="https://www.rfc-editor.org/info/rfc5322">RFC 5322</a> simplified regex was meant to be used as the email verification.
     * It was changed due to problems in the code. It will be reintroduced in a future version.
     * </p>
     *
     * @param {string} email the email address to validate
     * @return {boolean} {@code true} if the email address is valid according to the current pattern;
     * {@code false} otherwise
     */
    IsEmailValid(email) {
        if (typeof email == "string") {
            return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        }
        return false;
    }
}

/**
 * Database Utility functions
 */
const DbUtils = {
    /**
     * Gets the user data from the database with a user id.
     * @param {*} client database client for handling queries
     * @param {*} user_id the user id to get the data for
     * @returns undefined if the user is not found or the user data
     */
    async GetUserDataById(client, user_id) {
        const result = await client.query(queries.USER_BY_ID, [user_id]);

        if (result.rows.length < 1) {
            return undefined;
        }

        return result;
    },

    /**
     * Creates a new user.
     * @param {*} client database client for handling queries
     * @param {*} name the name of the user
     * @param {*} lastname the lastname of the user
     * @param {*} email the email of the user
     * @param {*} hash the hashed password of the user
     */
    async AddNewUser(client, name, lastname, email, hash) {
        await client.query(queries.ADD_USER, [name, lastname, email, hash]);
    },

    /**
     * Check if an account with the passed email already exists.
     * @param {*} client database client for handling queries
     * @param {*} email the user email to check
     * @returns true if an account is found
     */
    async IsEmailAlreadyUsed(client, email) {
        const result = await client.query(queries.USER_BY_EMAIL, [email]);
        console.log(result.rows.length);
        console.log(result.rows.length > 0);
        return (result.rows.length > 0);
    },

    /**
     * Gets the user data from the database with a user email.
     * @param {*} client database client for handling queries
     * @param {*} email the user email to get the data for
     * @returns undefined if the user is not found or the user data
     */
    async GetUserDataByEmail(client, email) {
        const result = await client.query(queries.USER_BY_EMAIL, [email]);

        if (result.rows.length < 1) {
            return undefined;
        }

        return result;
    },

    /**
     * Deletes a token.
     * @param {*} client 
     * @param {*} token the token to be removed
     */
    async DeleteToken(client, token) {
        const result = await client.query(queries.DELETE_TOKEN, [token]);
    }
}

module.exports = { DataUtils, DbUtils };