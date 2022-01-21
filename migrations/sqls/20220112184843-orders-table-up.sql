CREATE TABLE orders(id SERIAL PRIMARY KEY, status VARCHAR(64) , user_id bigint REFERENCES users(id));
INSERT INTO orders(status,user_id) VALUES ('active' , 1);