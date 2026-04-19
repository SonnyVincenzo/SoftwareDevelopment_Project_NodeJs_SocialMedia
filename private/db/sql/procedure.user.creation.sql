-- how to use:
-- SET @isSuccess = 0;
-- CALL AddUser(name, pass, @isSuccess);
-- if @isSuccess IS 1 ...

USE `social_test`;
-- Stops duplicate usernames
DROP PROCEDURE IF EXISTS Adduser;
DELIMITER $$
CREATE PROCEDURE AddUser
(
	IN newUserName CHAR(30),
	IN newUserPass CHAR(300),
	OUT isSuccess BOOLEAN
)
BEGIN
    -- prevent same username
    -- we use username as PK
	IF EXISTS
  	(
		SELECT 1 
		FROM `User`
		WHERE `username` = newUserName
	)
	THEN	
	    SET isSuccess = 0;
	ELSE
        INSERT INTO `User` (`username`, `password`, `joinDate`)
        VALUES (newUserName, newUserPass, CURRENT_TIMESTAMP);

		SET isSuccess = 1;
	END IF;
END $$
DELIMITER ;
