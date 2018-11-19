"option strict"

const db = require('./db/db'),
      mysqlconn = require('./db/mysql/connection'),
      mysql = require('mysql'),
      settings = require('./settings');

var connection = new mysqlconn({host: settings.HOST, 
                                user: settings.USER_NAME, 
                                password: settings.PASSWORD, 
                                database: settings.DB_NAME,
                                }, mysql);
var mysqldb = new db({connection: connection})

// var promise = new Promise(resolve, reject)
var result = mysqldb.query('Select * From `Germaneness_School`.`Application`')
result.then(function(data){
    console.log(data)
}).catch(function(err){
    throw err
})