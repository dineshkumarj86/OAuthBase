Create Database `Germaneness_Users`;
CREATE USER 'dinesh'@'localhost' IDENTIFIED BY 'Austere';

use `Germaneness_Users`;

CREATE TABLE `Germaneness_Users`.`Users` (
	Id bigint AUTO_INCREMENT primary key,
    UserId varchar(65) NOT NULL,
    UserName varchar(500) NOT NULL,
    `Password` varchar(500) NOT NULL
);

Alter Table `Germaneness_Users`.`Users` Add Constraint UK_UserName UNIQUE(UserName);
Alter Table `Germaneness_Users`.`Users` Add Constraint UK_UserId UNIQUE(UserId);

CREATE TABLE `Germaneness_Users`.`Application` (
	Id bigint AUTO_INCREMENT primary key,
	AppId varchar(65),
	AppSecret varchar(65),
    AppName varchar(500),
    IsAdminApp TINYINT(1)
);

Alter Table `Germaneness_Users`.`Application` Add Constraint UK_AppId UNIQUE(AppId, AppSecret);
Alter Table `Germaneness_Users`.`Application` Add Constraint UK_AppName UNIQUE(AppName);
Alter Table `Germaneness_Users`.`Application` Add RedirectUri varchar(1500);
Alter Table `Germaneness_Users`.`Application` Add Constraint UK_RedirectUri UNIQUE(RedirectUri);

CREATE TABLE `Germaneness_Users`.`app_user` (
AppUserId bigint AUTO_INCREMENT primary key,
AppId varchar(65),
UserId varchar(65),
FOREIGN KEY (AppId) REFERENCES Application(AppId),
FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE TABLE `Germaneness_Users`.`oauth_tokens` (
    Id bigint AUTO_INCREMENT primary key,
    Created_Date datetime,
		IsAppToken int(11),
    AppId varchar(65),
    UserId varchar(65),
		Access_Token varchar(5000),
    Access_Token_Expiry datetime
);
