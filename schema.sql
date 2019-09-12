CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4 (),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE urls (
    record_id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid,
    url TEXT NOT NULL,
    created_at TEXT NOT NULL
);
