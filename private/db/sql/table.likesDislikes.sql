CREATE TABLE IF NOT EXISTS `user_likes_dislikes` (
    `id` INT UNSIGNED NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    type ENUM('like','dislike'),
    PRIMARY KEY (`id`, `username`),
    FOREIGN KEY (`id`) REFERENCES `posts`(`id`),
    FOREIGN KEY (`username`) REFERENCES `users`(`username`)
);