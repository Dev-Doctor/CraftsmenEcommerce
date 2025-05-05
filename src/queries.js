module.exports = {
    USER_BY_EMAIL: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
    CREATE_USER_TOKEN: 'INSERT INTO user_tokens (user_id, token) VALUES ($1, $2)',
    ADD_USER: 'INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4)'
}