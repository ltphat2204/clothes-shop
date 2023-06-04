const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authorization');
const controller = require('../controllers/authorization');

// @route GET /authorization
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, controller.get);

// @route POST /authorization/signup
// @desc Create new user
// @access Public
router.post('/signup', controller.signup);

// @route POST /authorization/signin
// @desc Find user in database
// @access Public
router.post('/signin', controller.signin);

// @route GET /authorization/staff
// @desc Find user in database
// @access Public
router.get('/staff', controller.getStaff);

// @route DELETE /authorization/staff/:id
// @desc Find user in database
// @access Public
router.delete('/staff/:id', controller.deleteStaff);

module.exports = router;