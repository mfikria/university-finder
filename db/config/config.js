const path = require('path')

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    storage: path.join(__dirname, '..', 'database_development.sqlite'),
    host: 'localhost',
    dialect: 'sqlite',
    logging: true,
    operatorsAliases: false,
  },
  test: {
    username: 'root',
    password: 'root',
    storage: path.join(__dirname, '..', 'database_test.sqlite'),
    host: 'localhost',
    dialect: 'sqlite',
    logging: true,
    operatorsAliases: false,
  },
}
