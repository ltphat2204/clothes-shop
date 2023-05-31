const express = require('express');
const router = express.Router();
const controller = require('../controllers/size');

// @route GET /sizes
// @desc Return all of the current sizes
// @access Public
router.get('/', controller.getAll);

// @route GET /sizes/:id
// @desc Return specific size by its id
// @access Public
router.get('/:id', controller.getDetail);

// @route POST /sizes
// @desc Create new size
// @access Private
router.post('/', controller.post);

// @route GET /sizes/:id
// @desc Edit specific size by its id
// @access Private
router.put('/:id', controller.put);

// @route GET /sizes/:id
// @desc Delete specific size by its id
// @access Private
router.delete('/:id', controller.delete);

module.exports = router;