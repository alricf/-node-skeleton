-- Drop and recreate Organizations table

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
