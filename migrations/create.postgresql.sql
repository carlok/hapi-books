DROP TABLE IF EXISTS "users" ;

CREATE TABLE IF NOT EXISTS "users" (
  "user_pk" SERIAL,
  "name" VARCHAR(50) NOT NULL,
  "username" VARCHAR(50) NOT NULL,
  "email" VARCHAR(250) NOT NULL,
  "password" VARCHAR(128) NOT NULL,

  "created_at" TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY ("user_pk")
);

DROP TABLE IF EXISTS "books" ;

CREATE TABLE IF NOT EXISTS "books" (
  "books_pk" SERIAL,
  "users_user_fk" integer NOT null check(users_user_fk > 0),
  "title" VARCHAR(50) NOT NULL,

  "created_at" TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY ("books_pk"),
  CONSTRAINT "books_users_user_fk"
    FOREIGN KEY ("users_user_fk")
    REFERENCES "users" ("user_pk")
);