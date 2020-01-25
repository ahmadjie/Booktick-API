const jwt = require('jsonwebtoken');
const model = require('../models');
const User = model.users;

exports.login = (req, res) => {
	const { username, password } = req.body;

	User.findOne({
		where: {
			username,
			password
		}
	})
		.then((user) => {
			if (user) {
				const token = jwt.sign({ userRole: user.role, userId: user.id }, 'asep');
				if (token) {
					res.status(200).json({
						data: {
							message: 'Success',
							username,
							token
						}
					});
				}
			} else {
				res.status(403).json({
					message: 'username atau Password Anda Salah'
				});
			}
		})
		.catch((err) => {
			res.status(403).json({
				message: err.message
			});
		});
};

exports.register = (req, res) => {
	const { name, username, email, password, image } = req.body;
	User.findOne({
		where: {
			email
		}
	}).then(dataEmail => {
		if (dataEmail === null) {
			User.findOne({
				where: {
					username
				}
			}).then(dataUsername => {
				if (dataUsername === null) {
					User.create({
						name: name,
						phone: '+62',
						email: email,
						image: image,
						username: username,
						password: password,
						role: 2
					}).then((user) => {
						const token = jwt.sign({ userId: user.id }, 'asep');
						res.send({
							message: 'success',
							token,
							user
						});
					});
				} else {
					const message = "username already"
					res.status(200).send(message)
				}
			}).catch(err => {
				res.send(err)
			})
		} else {
			const message = "email already"
			res.status(200).send(message)
		}
	}).catch(err => {
		res.send(err)
	})
};


// const { name, username, email, password, image } = req.body;
// User.create({
// 	name: name,
// 	phone: '+62',
// 	email: email,
// 	image: image,
// 	username: username,
// 	password: password,
// 	role: 2
// }).then((user) => {
// 	const token = jwt.sign({ userId: user.id }, 'asep');
// 	res.send({
// 		data: {
// 			message: 'success',
// 			token,
// 			user
// 		}
// 	});
// });