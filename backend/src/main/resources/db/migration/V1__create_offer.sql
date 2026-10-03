CREATE TABLE offers (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    days INTEGER NOT NULL,

    nights INTEGER NOT NULL,

    price NUMERIC(10, 2) NOT NULL,

    location_summary VARCHAR(255) NOT NULL,

    image_url TEXT NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
