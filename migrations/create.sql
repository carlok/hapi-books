DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `user_pk` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(128) NOT NULL,

  `created_at` TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY (`user_pk`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `books` ;

CREATE TABLE IF NOT EXISTS `books` (
  `books_pk` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_user_fk` INT UNSIGNED NOT NULL,
  `title` VARCHAR(50) NOT NULL,

  `created_at` TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY (`books_pk`),
  CONSTRAINT `books_users_user_fk`
    FOREIGN KEY (`users_user_fk`)
    REFERENCES `users` (`user_pk`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;