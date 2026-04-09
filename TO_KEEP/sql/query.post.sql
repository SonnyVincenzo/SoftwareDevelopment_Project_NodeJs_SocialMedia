SET @queryName = "blob";
USE `database`;
SELECT  `id`, 
        `postTitle`,
        `postBody`,
        `postDate`
FROM `Post`
WHERE @queryName = `username`;