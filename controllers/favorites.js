const Model = require('../models');
const Events = Model.events;
const Favorites = Model.favorites;


exports.addFavorite = (req, res) => {
	const { eventId } = req.body;
	Favorites.findOne({
		where: {
			eventId,
			userId: tokenUserId
		},
		attributes: ["eventId", "userId"]
	}).then(data => {
		if (data) {
			const message = "you already favorite this events";
			res.status(200).send(message)
		} else if (data === null) {
			Favorites.create({
				eventId,
				userId: tokenUserId
			})
				.then((data) =>
					res.send({
						message: 'success',
						data
					})
				)
				.catch((err) => {
					res.status(200).send(err);
				});
		}
		else {
			const message = "Something Error";
			res.status(400).send(message);
		}
	}).catch(err => {
		res.send(err)
	})
};

exports.favoriteByUser = (req, res) => {
	Favorites.findAll({
		where: {
			userId: tokenUserId
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'userId']
		},
		include: [
			{
				model: Events,
				as: 'event',
				attributes: ['id', 'price', 'description', 'title', 'image']
			}
		]
	})
		.then((data) => {
			if (data.length > 0) {
				res.status(200).send(data);
			} else if (data.length <= 0) {
				res.status(200).send({
					message: 'You Have not favorite'
				});
			} else {
				res.send({
					message: 'error'
				});
			}
		})
		.catch((err) => {
			res.send({
				message: err
			});
		});
};