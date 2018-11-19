module.exports = settings = {}

const PORT = 3002

settings.port = PORT

settings.DB_NAME = "Germaneness_Users"
settings.HOST = "localhost"
settings.USER_NAME = "dinesh"
settings.PASSWORD = "Austere"

settings.ROUNDS = 10
settings.ISS = 'germaneness'
settings.AUD = 'germanenessclients'

settings.SUPPORTED_GRANT_TYPES= ["client_credentials", "password"]
settings.JWT_Secret = "GERMANENESS-en-in"
settings.ValidationHandlers = {}
