class validate{
  constructor(schemaLib) {
    this.schemalib = schemaLib
    this.schema = null
  }

  validateUIData(data) {
    return this.schemalib.validate(data, this.schema)
  }
}

module.exports = exports = validate
