USE `social_test`;
CREATE TABLE `User` (
  `username` CHAR(10) NOT NULL,
  `password` CHAR(20) NOT NULL,
  `joinDate` TIME NOT NULL,
  PRIMARY KEY (`username`)
);
