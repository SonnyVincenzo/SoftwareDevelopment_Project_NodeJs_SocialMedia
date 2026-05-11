SET @queryName = "blob";
USE `social_test`;
SELECT  `id`, 
        `username`,
        `postHeader`,
        `postText`,
        `postDate`
FROM `posts`
WHERE `username` = @queryName ;