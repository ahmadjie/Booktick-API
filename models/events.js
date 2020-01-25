'use strict';
module.exports = (sequelize, DataTypes) => {
	const events = sequelize.define(
		'events',
		{
			title: DataTypes.STRING,
			starTime: DataTypes.STRING,
			endTime: DataTypes.STRING,
			price: DataTypes.INTEGER,
			description: DataTypes.TEXT,
			address: DataTypes.TEXT,
			urlmaps: DataTypes.TEXT,
			image: DataTypes.TEXT,
			categoryId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER
		},
		{}
	);
	events.associate = function(models) {
		// associations can be defined here
		events.belongsTo(models.categories, {
			foreignKey: 'categoryId',
			as: 'category',
			sourceKey: 'id'
		});
		events.belongsTo(models.users, {
			foreignKey: 'userId',
			as: 'createdBy',
			sourceKey: 'id'
		});
	};
	return events;
};
