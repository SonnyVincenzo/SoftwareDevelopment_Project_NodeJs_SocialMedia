USE `social_test`;
CREATE TABLE `User` (
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `joinDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`)
);
