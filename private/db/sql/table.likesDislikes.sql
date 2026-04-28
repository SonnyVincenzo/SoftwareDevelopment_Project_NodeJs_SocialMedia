CREATE TABLE IF NOT EXISTS `userLikesDislikes` (
    `id` INT UNSIGNED NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    type ENUM('likes','dislikes'),
    PRIMARY KEY (`id`, `username`),
    FOREIGN KEY (`id`) REFERENCES `Posts`(`id`),
    FOREIGN KEY (`username`) REFERENCES `User`(`username`)
);

CREATE TABLE IF NOT EXISTS `likesDislikes` (
    `id` INT UNSIGNED NOT NULL,
    `likes` INT UNSIGNED,
    `dislikes` INT UNSIGNED,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `Posts`(`id`)
);