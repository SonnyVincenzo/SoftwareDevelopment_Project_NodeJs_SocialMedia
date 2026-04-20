SET @queryName = "blob";
USE `social_test`;
SELECT  `username`,
        `password`, 
        `joinDate` 
FROM `User`
WHERE `username` = @queryName;