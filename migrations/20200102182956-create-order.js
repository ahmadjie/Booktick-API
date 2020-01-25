'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			quantity: {
				type: Sequelize.INTEGER
			},
			totalPrice: {
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.STRING
			},
			attachment: {
				type: Sequelize.STRING
			},
			eventId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'events',
					key: 'id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			},
			buyerId: {
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
		return queryInterface.dropTable('orders');
	}
};
