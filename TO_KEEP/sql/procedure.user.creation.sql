-- how to use:
-- SET @isSuccess = 0;
-- CALL AddUser(name, pass, @isSuccess);
-- if @isSuccess IS 1 ...

USE database;
DELIMITER $$
CREATE PROCEDURE AddUser
(
	IN newUserName CHAR(20),
	IN newUserPass CHAR(20),
	OUT isSuccess BOOLEAN
)
BEGIN
    -- prevent same username
    -- we use username as PK
	IF EXISTS
  	(
		SELECT username 
		FROM User 
		WHERE newUserName = username
	)
	THEN	
	    SET isSuccess = 0;
	ELSE
	    SET isSuccess = 1;
        INSERT INTO User(username, password, joinDate)
        SELECT 
            newUserName,
            newUserPass,
            CURRENT_TIMESTAMP();
	END IF;
END $$
DELIMITER ;
