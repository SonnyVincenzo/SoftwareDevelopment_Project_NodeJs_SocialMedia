USE `social_test` ;
CREATE TABLE `likesDislikes` (
    `id` INT UNSIGNED NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    type ENUM(`likes`,`dislikes`),
    PRIMARY KEY (`id`, `username`),
    FOREIGN KEY (`id`) REFERENCES `Posts`(`id`)
    FOREIGN KEY (`username`) REFERENCES `User`(`username`)
);

