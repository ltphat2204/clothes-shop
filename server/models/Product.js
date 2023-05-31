const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	images: {
		type: [String],
		required: true
	},
	genre: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'genres'
	},
	size: [{
		type: Schema.Types.ObjectId,
		ref: 'sizes'
	}],
    price: {
        type: Number,
		required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
	hidden: {
		type: Boolean,
		default: false
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('products', ProductSchema);