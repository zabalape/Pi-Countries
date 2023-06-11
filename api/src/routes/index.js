const { Router } = require('express');
const countriesRouter = require('./countries');
const activitiesRouter = require('./activities');
const usersRouter = require('./users');
const utilsRouter = require('./utils');
const isAuthenticated = require('../utils/controller/isAuthenticated');

const router = Router();

router.use('/countries', isAuthenticated, countriesRouter);
router.use('/activities', isAuthenticated,activitiesRouter);
router.use('/users',isAuthenticated, usersRouter);
router.use('/utils', utilsRouter);
module.exports = router;
