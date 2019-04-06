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
settings.EMAIL_TEMPLATE_NAME = 'JFinance_Register_NewUser'

settings.SUPPORTED_GRANT_TYPES= ["client_credentials", "password"]
settings.JWT_Secret = "GERMANENESS-en-in"
settings.ValidationHandlers = {}
settings.ACCESSKEY = {
  accessKeyId: 'AKIAIJ5OLAPHU4TQFBTA',
  secretAccessKey: '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'
}
settings.REGION = 'us-west-2'
settings.ARN = 'arn:aws:sns:us-west-2:607587534288:Germaneness-API-IUser'
settings.FROM_EMAIL = 'dineshkumarj86+noreply@gmail.com'
