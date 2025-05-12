// ALPHABETHICAL ORDER
module.exports = {
    ADD_USER: 'INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4)',
    ADD_PRODUCT: 'INSERT INTO products (user_id, name, description, price, stock_quantity) VALUES ($1, $2, $3, $4, $5)',
    
    CHECK_USER_TOKEN: 'SELECT * FROM user_tokens WHERE token = $1',
    CREATE_USER_TOKEN: 'INSERT INTO user_tokens (user_id, token) VALUES ($1, $2)',
    
    DELETE_ALL_TOKEN_BY_USER_ID: 'DELETE FROM user_tokens WHERE user_id = $1',
    DELETE_TOKEN: 'DELETE FROM user_tokens WHERE token = $1',

    SELLER_BY_USER_ID: 'SELECT * FROM sellers WHERE user_id = $1 LIMIT 1',

    USER_BY_EMAIL: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
    USER_BY_ID: 'SELECT * FROM users WHERE user_id = $1 LIMIT 1',

    PRODUCT_BY_ID: 'SELECT * from products WHERE product_id = $1 LIMIT 1',
 
    USER_BY_TOKEN: 'SELECT * FROM users u JOIN user_tokens ut ON u.user_id = ut.user_id WHERE ut.token = $1 LIMIT 1',

    UPDATE_PASSWORD: 'UPDATE public.users SET password = $1 WHERE user_id = $2',
    UPDATE_EMAIL: 'UPDATE public.users SET email = $1 WHERE user_id = $2'
}