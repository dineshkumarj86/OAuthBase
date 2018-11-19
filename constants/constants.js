//USERS Query
const INSERT_USERS = `Insert Into Users Set ?`;
const UPDATE_USERS = `UPDATE users SET ? WHERE UserID = :UserID`;
const SELECT_USER_BY_USERID = 'Select * From Users Where UserId = ?';
const SELECT_USER_BY_USERNAME = 'Select * From Users Where UserName = %s';
const SELECT_USERID_BY_USERNAME = 'Select UserId From Users Where UserName = ?'
const SELECT_USERS_BY_USERNAME_PASSWORD = 'Select UserId From Users Where UserName = ? and Password = ?'
//AppUsers Query
const INSERT_APP_USERS = 'Insert Into app_user Set ?';
const UPDATE_APP_USERS = 'UPDATE app_user Set ?';
const SELECT_APP_USERS_BY_USERID_APPID = 'Select * From app_user Where UserId = ? And AppId = ?'
const DELETE_APP_USERS_BY_USERID_APPID = 'Delete From app_user Where UserId = ? And AppId = ?'
const SELECT_APP_BY_APPID_USERNAME = 'Select U.* From app_user AU Inner Join Users U ON \
                                      U.UserId = AU.UserId Where U.UserName = ? And AU.AppId = ?'
//Application Query
const INSERT_APPLICATION = `Insert Into Application Set ?`;
const SELECT_APPLICATION_BY_APPNAME = 'Select AppName From Application Where AppName = ?'
const SELECT_ALL_APPLICATIONS = 'Select * From Application';
const SELECT_APPLICATION_BY_APPID_AND_APPSECRET = 'Select AppId, AppSecret, IsAdminApp From Application \
                                                   Where AppId = %s And AppSecret = %s';
//OAuth_Tokens
const SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_USER_TOKEN = 'Select * From oauth_tokens Where UserId = ? and AppId = ? and IsAppToken = 0'
const SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_APP_TOKEN = 'Select * From oauth_tokens Where AppId = ? and IsAppToken = 1'
const INSERT_APP_TOKENS = 'INSERT INTO oauth_tokens Set ?'

module.exports = {
    query:{
        //Application
        'SELECT_ALL_APPLICATIONS' : SELECT_ALL_APPLICATIONS,
        'SELECT_APPLICATION_BY_APPID_AND_APPSECRET': SELECT_APPLICATION_BY_APPID_AND_APPSECRET,
        'INSERT_APPLICATION': INSERT_APPLICATION,
        'SELECT_APPLICATION_BY_APPNAME': SELECT_APPLICATION_BY_APPNAME,

        //Users
        'INSERT_USERS': INSERT_USERS,
        'UPDATE_USERS': UPDATE_USERS,
        'SELECT_USER_BY_USERID': SELECT_USER_BY_USERID,
        'SELECT_USER_BY_USERNAME': SELECT_USER_BY_USERNAME,
        'SELECT_USERID_BY_USERNAME': SELECT_USERID_BY_USERNAME,
        'SELECT_USERS_BY_USERNAME_PASSWORD': SELECT_USERS_BY_USERNAME_PASSWORD,


        //APPUsers
        'INSERT_APP_USERS': INSERT_APP_USERS,
        'UPDATE_APP_USERS': UPDATE_APP_USERS,
        'SELECT_APP_USERS_BY_USERID_APPID': SELECT_APP_USERS_BY_USERID_APPID,
        'DELETE_APP_USERS_BY_USERID_APPID': DELETE_APP_USERS_BY_USERID_APPID,
        'SELECT_APP_BY_APPID_USERNAME': SELECT_APP_BY_APPID_USERNAME,

        //OAuth_Tokens
        'SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_USER_TOKEN': SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_USER_TOKEN,
        'SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_APP_TOKEN': SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_APP_TOKEN,
        'INSERT_APP_TOKENS': INSERT_APP_TOKENS
    }
}
