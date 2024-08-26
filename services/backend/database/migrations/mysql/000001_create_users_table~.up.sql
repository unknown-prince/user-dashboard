CREATE TABLE IF NOT EXISTS Users(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    name VARCHAR (127) NOT NULL,
    surname VARCHAR (127) NOT NULL,
    number INT NOT NULL,
    gender VARCHAR (127) NOT NULL,
    country VARCHAR (127) NOT NULL,
    dependents INT NOT NULL,
    birthdate date NOT NULL,
    PRIMARY KEY (ID)
)