function MySqlConnection(options, lib){
	if(lib === undefined || lib === null)
		throw new Error('MySql: DB Library is not defined');

	if(options === null || undefined === options)
		throw new Error('MySql : Expected HostName and other arguments');

	this.options = options || {}
	this.lib = lib	
}

MySqlConnection.prototype.connect = function(){
	return this.lib.createConnection(this.options)
}

module.exports = exports = MySqlConnection