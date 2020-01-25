const Model = require('../models');
const Users = Model.users;

exports.userById = (req, res) => {
	Users.findOne({
		where: {
			id: tokenUserId
		},
		attributes: {
			exclude: [ 'createdAt', 'updatedAt', 'password' ]
		}
	})
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message
			});
		});
};

exports.userByLogin = (req, res) => {
	Users.findOne({
		where: {
			id: tokenUserId
		},
		attributes: {
			exclude: [ 'createdAt', 'updatedAt', 'password' ]
		}
	})
		.then((data) => {
			if (data !== null) {
				res.status(200).send(data);
			} else {
				res.status(403).send({
					message: 'must login'
				});
			}
		})
		.catch((err) => {
			res.send({
				message: err.message
			});
		});
};

exports.editProfile = (req, res) => {
	const { name, phone, email, image } = req.body;
	Users.findOne({
		where: {
			id: tokenUserId
		},
		attributes: {
			exclude: [ 'createdAt', 'updatedAt', 'password' ]
		}
	}).then((response) => {
		if (response) {
			Users.update(
				{
					name,
					phone,
					email,
					image
				},
				{
					where: {
						id: tokenUserId
					}
				}
			)
				.then((data) => {
					res.status(200).send(data);
				})
				.catch((err) => {
					res.status(403).send(err);
				});
		} else {
			res.status(200).send({
				message: 'error'
			});
		}
	});
};
