const express = require('express');
const router = express.Router();
const controller = require('../controllers/genre');

// @route GET /genres
// @desc Return all of the current genres
// @access Public
router.get('/', controller.getAll);

// @route GET /genres/:id
// @desc Return specific genre by its id
// @access Public
router.get('/:id', controller.getDetail);

// @route POST /genres
// @desc Create new genres
// @access Private
router.post('/', controller.post);

// @route GET /genres/:id
// @desc Edit specific genre by its id
// @access Private
router.put('/:id', controller.put);

// @route GET /genres/:id
// @desc Delete specific genre by its id
// @access Private
router.delete('/:id', controller.delete);

module.exports = router;