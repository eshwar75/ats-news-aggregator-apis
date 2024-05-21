require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const APP_PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', require('./routes/auth'))

try {
    const DATABASE_PORT = process.env.DATABASE_PORT || '127.0.0.1'
    const DATABASE_NAME = process.env.DATABASE_NAME || 'news-aggregator-db'
    console.log('Database is connected successfully');
    // this is will not work in nodejs above 18 version
    // mongoose.connect('mongodb://localhost:27017/news-aggregator-db'); 
    // use this version for above  nodejs 18 version
    // mongoose.connect(`mongodb://${DATABASE_HOST}/${DATABASE_NAME}`);
    mongoose.connect("mongodb://" + DATABASE_PORT + "/" + DATABASE_NAME);
} catch (err) {
    console.log("Failed while connecting to Database");
}

app.listen(APP_PORT, (err) => {
    if (err) {
        return console.log('Something went wrong', err);
    }
    console.log(`Server is connected for ${APP_PORT}`);
});

module.exports = app;