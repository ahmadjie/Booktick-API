const Model = require('../models');
const Order = Model.order;
const Events = Model.events;
const Category = Model.categories;
const User = Model.users;

exports.addOrder = (req, res) => {
	const { quantity, totalPrice, attachment, eventId } = req.body;
	Order.create({
		quantity: quantity,
		totalPrice: totalPrice,
		attachment: 'default',
		eventId: eventId,
		status: 'pending',
		buyerId: tokenUserId
	}).then((data) =>
		res.send({
			message: 'success',
			data
		})
	);
};

exports.index = (req, res) => {
	Order.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'eventId', 'categoryId', 'userId', 'buyerId']
		},
		include: [
			{
				model: Events,
				as: 'event',
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId', 'urlmaps', 'endTime', 'image']
				}
			},
			{
				model: User,
				as: 'buyer',
				attributes: ['id', 'name']
			}
		]
	}).then((data) => {
		res.send(data);
	});
};

exports.orderByStatus = (req, res) => {
	const status = req.query.status;
	Order.findAll({
		where: {
			buyerId: tokenUserId,
			status
		},
		attributes: ['id', 'status', 'totalPrice', 'quantity'],
		include: [
			{
				model: Events,
				as: 'event',
				attributes: ['id', 'price', 'description', 'title', 'image', 'address', 'starTime']
			},
			{
				model: User,
				as: 'buyer',
				attributes: ['id', 'name']
			}
		]
	})
		.then((data) => {
			if (data.length > 0) {
				res.status(200).send(data);
			} else if (data.length <= 0) {
				res.status(200).send({
					message: 'You Have not order'
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

exports.orderById = (req, res) => {
	const id = req.params.id;
	const status = req.query.status;
	Order.findOne({
		where: {
			id,
			buyerId: tokenUserId,
			status
		},
		attributes: ['id', 'status', 'totalPrice', 'quantity'],
		include: [
			{
				model: Events,
				as: 'event',
				attributes: ['id', 'price', 'description', 'title', 'image', 'address', 'starTime']
			},
			{
				model: User,
				as: 'buyer',
				attributes: ['id', 'name']
			}
		]
	})
		.then((data) => {
			if (data !== null) {
				res.status(200).send(data);
			} else {
				res.status(401).send({
					message: 'Unauthorized'
				});
			}
		})
		.catch((err) => {
			res.send({
				message: err
			});
		});
};

exports.confirmOrderById = (req, res) => {
	const { id, attachment } = req.body;

	Order.findOne({
		where: {
			id,
			buyerId: tokenUserId
		}
	})
		.then((response) => {
			if (response) {
				Order.update(
					{
						status: 'success',
						attachment: attachment
					},
					{
						where: {
							id
						}
					}
				)
					.then((data) => {
						console.log(data);
						res.status(200).send(data);
					})
					.catch((err) => {
						res.status(403).send(err);
					});
			} else {
				res.status(403).send({
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
