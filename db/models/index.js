const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]

const generateUser = require('./user')
const generateSubscription = require('./subscription')
const generateFavoriteUniversity = require('./favoriteuniversity')

let sequelize = new Sequelize(config)

const db = {
  User: generateUser(sequelize, Sequelize.DataTypes),
  Subscription: generateSubscription(sequelize, Sequelize.DataTypes),
  FavoriteUniversity: generateFavoriteUniversity(
    sequelize,
    Sequelize.DataTypes
  ),
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
