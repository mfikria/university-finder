const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hashSync('test', 10)
    return queryInterface.bulkInsert('Users', [
      {
        email: 'test@test.com',
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
