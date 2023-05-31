const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const controller = {};

controller.get = async (req, res) => {
	try {
		const user = await userModel.findById(req.userId).select('-password');

		if (!user) return res.status(400).json({ success: false, message: 'User not found' });

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

controller.signup = async (req, res) => {
	const { username, password, role } = req.body;

	if (!username || !password)
		return res.status(400).json({ success: false, message: 'Tài khoản và mật khẩu không được trống' });

	try {
		const user = await userModel.findOne({ username }).select('-password');

		if (user) return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });

		const hashedPassword = await argon2.hash(password);
		const newUser = new userModel({ username, password: hashedPassword, role });
		await newUser.save();

		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		);

		res.status(200).json({
			success: true,
			message: 'User created successfully',
			accessToken,
			user: newUser
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

controller.signin = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) return res.status(400).json({ success: false, message: 'Tài khoản và mật khẩu không được trống' });

	try {
		const user = await userModel.findOne({ username });

		if (!user) return res.status(400).json({ success: false, message: 'Tài khoản không tồn tại', field: 'username' })

		const passwordValid = await argon2.verify(user.password, password);

		if (!passwordValid) return res.status(400).json({ success: false, message: 'Sai mật khẩu', field: 'password' })

		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		);

		res.status(200).json({
			success: true,
			message: 'User logged in successfully',
			accessToken,
			user
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

module.exports = controller;