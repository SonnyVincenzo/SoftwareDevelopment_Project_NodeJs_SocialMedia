CREATE TABLE IF NOT EXISTS `userLikesDislikes` (
    `id` INT UNSIGNED NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    type ENUM('like','dislike'),
    PRIMARY KEY (`id`, `username`),
    FOREIGN KEY (`id`) REFERENCES `Posts`(`id`),
    FOREIGN KEY (`username`) REFERENCES `User`(`username`)
);
