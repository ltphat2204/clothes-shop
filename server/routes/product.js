const express = require('express');
const router = express.Router();
const upload = require('../middlewares/files_upload');
const getFilter = require('../middlewares/getFilter');
const disposalProductImages = require('../middlewares/disposalProductImages');
const controller = require('../controllers/product');

// @route GET /products
// @desc Return all of the current products
// @access Public
router.get('/', getFilter, controller.getAll);

// @route GET /products/:id
// @desc Return specific product by its id
// @access Public
router.get('/:id', controller.getDetail);

// @route POST /products
// @desc Create new product
// @access Private
router.post('/', upload.array('images', 5), controller.post);

// @route GET /products/:id
// @desc Edit specific product by its id
// @access Private
router.put('/:id', upload.array('images', 5), controller.put);

// @route GET /products/:id
// @desc Delete specific product by its id
// @access Private
router.delete('/:id', disposalProductImages, controller.delete);

module.exports = router;