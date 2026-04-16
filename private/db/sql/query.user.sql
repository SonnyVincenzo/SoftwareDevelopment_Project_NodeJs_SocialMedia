SET @queryName = "blob";
USE `social_test`;
SELECT  `password`, 
        `joinDate` 
FROM `User`
WHERE @queryName = `username`;