USE `social_test`;
CREATE TABLE `Posts` (
  `id` INT UNSIGNED NOT NULL,
  `username` CHAR(10) NOT NULL,
  `postTitle` CHAR(20) NOT NULL,
  `postBody` CHAR(20) NOT NULL,
  `postDate` TIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`username`) REFERENCES `User`(`username`)
);