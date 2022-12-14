require('dotenv').config();

module.exports = {
  PSQL: {
    PORT: process.env.PSQL_PORT || 5432,
    HOST: process.env.PSQL_HOST || 'localhost',
    USER: process.env.PSQL_USER || 'myuser',
    DATABASE: process.env.PSQL_DATABASE || 'mydb',
    PASSWORD: process.env.PSQL_PASSWORD || 'Zillt75mg*88',
  }
}