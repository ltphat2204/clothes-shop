const mongoose = require('mongoose');

const connectDB = async (db_url) => {
	try {
		await mongoose.connect(
			db_url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
	}
}

module.exports = { connectDB };