SET @queryName = "blob";
USE `social_test`;
SELECT  `id`, 
        `postTitle`,
        `postBody`,
        `postDate`
FROM `Post`
WHERE @queryName = `username`;