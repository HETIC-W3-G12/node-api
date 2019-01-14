require('dotenv').config()

let dbObj = null

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'euko-api',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
}