SET @queryName = "blob";
USE `social_test`;
SELECT  `id`, 
        `username`,
        `postHeader`,
        `postText`,
        `postDate`
FROM `Posts`
WHERE `username` = @queryName ;