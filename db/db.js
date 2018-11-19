class Db {
  constructor(options) {
    this.options = options || {}

    if (this.options.connection === null || this.options.connection === undefined) {
      throw new InvalidRequestError('Invalid access : DB Connection is not defined');
    }
  }

  query(query, params) {
    var conn = this.options.connection.connect()
    console.log(`Inside query : ${query}`)
    return new Promise(function(resolve, reject) {
      conn.query(query, params, function(err, result, fields) {
        if (err) throw reject(err)
        conn.end()
        resolve(result)
      })
      console.log(conn.query)
    });
  }

  executeUpdate(query, param) {
    var conn = this.options.connection.connect()
    return new Promise(function(resolve, reject) {
      conn.beginTransaction(function(err) {
        if (err) throw err;
        conn.query(query, param, function(err, result, fields) {
          if (err) {
            conn.rollback(function() {
              reject(err)
            });
          }
          conn.commit(function(err) {
            if (err) {
              conn.rollback(function() {
                reject(err)
              })
            }
            resolve(result)
          });
        });
      });
    });
  }

  executeMultiple(queryArray, queryArrayParams) {
    var conn = this.options.connection.connect()
    return new Promise(function(resolve, reject) {
      conn.beginTransaction(function(err) {
        if (err) throw err;
        for (let i = 0; i < queryArray.length; i++) {
					console.log(queryArray[i])
					console.log(queryArrayParams[i])
          conn.query(queryArray[i], queryArrayParams[i], function(err, result, fields) {
            if (err) {
							console.log('Inside Error')
							console.log(err)
              conn.rollback(function() {
                reject(err)
								return;
              });
            }
          });
        }
				conn.commit(function(err){
					if(err){
						conn.rollback(function() {
							reject(err)
							return;
						});
					}
					console.log('Transaction Complete')
					resolve(true);
				}); //End Commit
      }); //End begin transaction
    });//End Promise
  }
}

module.exports = exports = Db
