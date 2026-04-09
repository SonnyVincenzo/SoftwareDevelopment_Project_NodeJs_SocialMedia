SET @queryName = "blob";
USE `database`;
SELECT  `password`, 
        `joinDate` 
FROM `User`
WHERE @queryName = `username`;