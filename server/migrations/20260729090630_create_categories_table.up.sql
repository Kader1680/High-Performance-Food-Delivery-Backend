CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,

    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_restaurant_category
        UNIQUE (restaurant_id, title)
);