CREATE TYPE order_status AS ENUM (
    'pending',
    'delivering',
    'completed',
    'cancelled'
);

CREATE TYPE transaction_status AS ENUM (
    'paid',
    'failed'
);

CREATE TABLE users (
    user_id serial,
    name varchar(60) NOT NULL,
    last_name varchar(60) NOT NULL,
    email varchar(60) NOT NULL,
    password varchar(255) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_admin boolean DEFAULT false,
    is_artigian boolean DEFAULT false,

    CONSTRAINT users_pk PRIMARY KEY (user_id)
);

CREATE TABLE products (
    product_id serial,
    user_id int,
    name varchar(250) NOT NULL,
    description text,
    price float,
    stock_quantity int DEFAULT 0,
    is_active boolean DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT products_pk PRIMARY KEY (product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE orders (
    order_id serial,
    user_id int,
    payed boolean DEFAULT false,
    order_date timestamp DEFAULT CURRENT_TIMESTAMP,
    status order_status DEFAULT 'pending',

    CONSTRAINT order_pk PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE order_items (
    order_id int,
    product_id int,
    quantity int NOT NULL DEFAULT 1,
    unit_price float NOT NULL,

    CONSTRAINT order_items_pk PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE user_tokens (
    user_id int,
    token string NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days',

    CONSTRAINT user_tokens_pk PRIMARY KEY (user_id, token),
    FOREIGN KEY user_id REFERENCES users (user_id)
);

CREATE TABLE cart_items (
    user_id int,
    product_id int,
    quantity int DEFAULT 1,

    CONSTRAINT cart_items_pk PRIMARY KEY (user_id, product_id),
    FOREIGN KEY user_id REFERENCES users (user_id),
    FOREIGN KEY product_id REFERENCES products (product_id)
);

CREATE TABLE transaction (
    transaction_id serial,
    order_id int,
    payment_date timestamp,
    status transaction_status,

    CONSTRAINT transaction_pk PRIMARY KEY (transaction_id),
    FOREIGN KEY order_id REFERENCES orders (order_id)
);

CREATE TABLE reviews (
    user_id int,
    product_id int,
    vote int,
    description text,
    
    CONSTRAINT reviews_pk PRIMARY KEY (user_id, product_id),
    FOREIGN KEY user_id REFERENCES users (user_id),
    FOREIGN KEY product_id REFERENCES products (product_id)
);

CREATE TABLE categories (
    category_name varchar(30) NOT NULL,
    CONSTRAINT categories_pk PRIMARY KEY (category_name)
);

CREATE TABLE product_categories (
    category_name varchar(30),
    product_id int,

    CONSTRAINT product_categories_pk PRIMARY KEY (category_name, product_id),
    FOREIGN KEY category_name REFERENCES categories (category_name),
    FOREIGN KEY product_id REFERENCES products (product_id)
);