module.exports = {
  development: {
    username: 'root',
    password: 'root',
    storage: './db/database_development.sqlite',
    host: 'localhost',
    dialect: 'sqlite',
    logging: true,
    operatorsAliases: false,
  },
  test: {
    username: 'root',
    password: 'root',
    storage: './db/database_test.sqlite',
    host: 'localhost',
    dialect: 'sqlite',
    logging: true,
    operatorsAliases: false,
  },
}
