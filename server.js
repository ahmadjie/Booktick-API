const express = require('express');
require('express-group-routes');
const categoriesController = require('./controllers/categories');
const eventsController = require('./controllers/events');
const orderController = require('./controllers/orders');
const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const favoriteController = require('./controllers/favorites');
const middleware = require('./middleware');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

app.group('/api/v1', (router) => {
	//events
	router.get('/events', eventsController.allEvents);
	router.get('/event/', eventsController.eventsByTitle);
	router.post('/event/', middleware.checkAuth, eventsController.addEvent);
	router.get('/today/events', eventsController.today);
	router.get('/upcoming/events', eventsController.upComing);
	router.get('/category/:id/events', eventsController.eventsByCategory);
	router.get('/event/:id', eventsController.eventsByid);

	//category
	router.get('/categories', categoriesController.index);
	router.get('/category/:id', categoriesController.byId);

	//login & register
	router.post('/login', authController.login);
	router.post('/register', authController.register);

	//order = payment & myTicket
	router.post('/order', middleware.checkAuth, orderController.addOrder);
	router.get('/orders', orderController.index);
	router.get('/user/orders', middleware.checkAuth, orderController.orderByStatus);
	router.get('/order/:id', middleware.checkAuth, orderController.orderById);
	router.put('/order', middleware.checkAuth, orderController.confirmOrderById);

	//profile
	router.get('/profile/:id', userController.userById);
	router.get('/profile', middleware.checkAuth, userController.userByLogin);
	router.put('/profile', middleware.checkAuth, userController.editProfile);

	//favorites
	router.get('/user/favorite', middleware.checkAuth, favoriteController.favoriteByUser);
	router.post('/favorite', middleware.checkAuth, favoriteController.addFavorite);


});

app.listen(port, () => console.log(`run on port ${port}`));
