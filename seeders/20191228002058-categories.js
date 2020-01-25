'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'categories',
			[
				{
					name: 'Programming',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Sport',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Music',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Science',
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
		return queryInterface.bulkDelete('categories', null, {});
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
	}
};
