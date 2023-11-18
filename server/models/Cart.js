const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	product: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'products'
	}],
});

module.exports = mongoose.model('cart', CartSchema);