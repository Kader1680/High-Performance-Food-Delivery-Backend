CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY,

    owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    name VARCHAR(255) NOT NULL,
    description TEXT,

    
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    is_open BOOLEAN NOT NULL DEFAULT FALSE,

    phone VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);