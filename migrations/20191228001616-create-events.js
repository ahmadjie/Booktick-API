'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('events', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			starTime: {
				type: Sequelize.STRING
			},
			endTime: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.INTEGER
			},
			description: {
				type: Sequelize.TEXT
			},
			address: {
				type: Sequelize.TEXT
			},
			urlmaps: {
				type: Sequelize.TEXT
			},
			image: {
				type: Sequelize.TEXT
			},
			categoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'categories',
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('events');
	}
};
