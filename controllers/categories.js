const Model = require('../models');
const Categories = Model.categories;

exports.index = (req, res) => {
	Categories.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt']
		}
	}).then((data) => res.send(data));
};

exports.byId = (req, res) => {
	const { id } = req.params;
	Categories.findOne({
		where: {
			id
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt']
		}
	}).then((data) => {
		res.send(data);
	});
};
