SET @queryName = "blob";
USE `social_test`;
SELECT  `username`,
        `password`, 
        `joinDate` 
FROM `users`
WHERE `username` = @queryName;