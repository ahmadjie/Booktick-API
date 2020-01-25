const Model = require('../models');
const Categories = Model.categories;
const Events = Model.events;
const Users = Model.users;
const Helper = require('../helper/helper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.allEvents = (req, res) => {
	Events.findAll({
		attributes: ['id', 'title', 'description', 'price', 'starTime', 'image']
	}).then((data) => {
		res.send(data);
	});
};

exports.eventsByTitle = (req, res) => {
	const title = req.query.title;
	Events.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId']
		},
		where: {
			title: {
				[Op.startsWith]: title
			}
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			}
		],
		include: [
			{
				model: Users,
				as: 'createdBy',
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'role', 'password', 'username']
				}
			}
		]
	}).then((data) => {
		res.send(data);
	});
};

exports.eventsByCategory = (req, res) => {
	const { id } = req.params;
	Events.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId']
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				},
				where: {
					id
				}
			},
			{
				model: Users,
				as: 'createdBy',
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'role', 'password', 'username']
				}
			}
		]
	}).then((data) => res.send(data));
};

exports.eventsByid = (req, res) => {
	const { id } = req.params;
	Events.findOne({
		where: {
			id
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId']
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			},
			{
				model: Users,
				as: 'createdBy',
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'role', 'password', 'username']
				}
			}
		]
	}).then((data) => {
		res.send(data);
	});
};

exports.addEvent = (req, res) => {
	const { title, starTime, endTime, price, description, address, urlmaps, image, categoryId } = req.body;
	Events.create({
		title,
		categoryId,
		starTime,
		endTime,
		price,
		description,
		address,
		urlmaps,
		image,
		userId: tokenUserId
	})
		.then((data) => {
			message = 'Success';
			res.status(200).json({ message, data });
		})
		.catch((error) => {
			res.status(500).json({ message: error });
		});
};

exports.today = (req, res) => {
	Events.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId']
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			},
			{
				model: Users,
				as: 'createdBy',
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'role', 'password', 'username']
				}
			}
		],
		where: {
			starTime: {
				[Op.substring]: Helper.getDateToday()
			}
		}
	})
		.then((data) => {
			if (!data.length) {
				message = 'Data Not found';
				res.status(200).json(data);
			} else {
				res.status(200).json(data);
			}
		})
		.catch((error) => {
			message = 'Bad request';
			res.status(400).send(error);
		});
};


exports.upComing = (req, res) => {
	Events.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId']
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			},
			{
				model: Users,
				as: 'createdBy',
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'role', 'password', 'username']
				}
			}
		],
		where: {
			starTime: {
				[Op.gt]: Helper.getNextDateFromToday()
			}
		}
	})
		.then((data) => {
			if (!data.length) {
				message = 'Data Not found';
				res.status(200).json(data);
			} else {
				res.status(200).json(data);
			}
		})
		.catch((error) => {
			message = 'Bad request';
			res.status(400).send(error);
		});
};
