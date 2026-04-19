USE `social_test`;
CREATE TABLE `Posts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `postHeader` VARCHAR(80) NOT NULL,
  `postText` VARCHAR(500) NOT NULL,
  `postDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  -- foreign key rule between user and posts table
  CONSTRAINT `FK_posts_users`
    FOREIGN KEY (`username`) REFERENCES `User`(`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);