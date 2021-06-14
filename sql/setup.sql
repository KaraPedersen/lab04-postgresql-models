DROP TABLE IF EXISTS dogs, cats, birds;

CREATE TABLE dogs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  weight TEXT
);

CREATE TABLE cats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  weight TEXT
);

CREATE TABLE birds (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  weight TEXT
);
