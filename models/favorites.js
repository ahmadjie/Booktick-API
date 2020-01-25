'use strict';
module.exports = (sequelize, DataTypes) => {
	const favorites = sequelize.define(
		'favorites',
		{
			eventId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER
		},
		{}
	);
	favorites.associate = function(models) {
		// associations can be defined here

		favorites.belongsTo(models.users, {
			foreignKey: 'userId',
			as: 'user'
		});

		favorites.belongsTo(models.events, {
			foreignKey: 'eventId',
			as: 'event'
		});
	};
	return favorites;
};
