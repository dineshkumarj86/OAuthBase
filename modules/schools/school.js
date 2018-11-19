const schoolcontroller = require('./controller')

class School {

	constructor(app, db) {
		this.app = app
		this.db = db
		this.domain = new schoolcontroller(db)
	}

	loadRoutes() {
		this.app.get('/', this.domain.getSchools);
	}
}

module.exports = School