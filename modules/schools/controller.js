function SchoolController(db){

    this.getSchools = function(request, response){
        var schools = [{'schoolId': 1, 'schoolName': 'Sampel'}, {'schoolId': 2, 'schoolName': 'Sampel1'}]
        console.log('Inside Schools')
        response.send(schools)
    }
}

module.exports = SchoolController