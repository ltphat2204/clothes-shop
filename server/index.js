require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {connectDB} = require('./Database');
const sizeRoute = require('./routes/size');
const productRoute = require('./routes/product');
const genreRoute = require('./routes/genre');
const authorizationRoute = require('./routes/authorization');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static('images'));

connectDB(process.env.DB_URL);

app.get('/', (req, res) => res.send('Express return'));
app.use('/sizes', sizeRoute);
app.use('/products', productRoute);
app.use('/genres', genreRoute);
app.use('/authorization', authorizationRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))