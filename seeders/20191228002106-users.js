'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'users',
			[
				{
					name: 'Ahmad Adjie',
					phone: '081018018018',
					email: 'ahmad.adjiep@gmail.com',
					image: 'https://reactjs.org/logo-og.png',
					role: 1,
					username: 'ahmadjie',
					password: 12345,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Asep',
					phone: '081018018018',
					email: 'asep@gmail.com',
					image: 'https://reactjs.org/logo-og.png',
					role: 2,
					username: 'Asep keren',
					password: 12345,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
	}
};
