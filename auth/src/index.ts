const mongoose = require("mongoose");

import { app } from './app';

// Connecting to mongodb 
const start = async () => {

    if (!process.env.JWT_TOKEN) {
        throw new Error('JWY_TOKEN must be definded');
    }
      
    if (!process.env.MONGO_DB_URI) {
        throw new Error('MONGO_DB_URI must be definded');
    }

    if (!process.env.MONGO_DB_PORT) {
        throw new Error('MONGO_DB_PORT must be definded');
    }

    if (!process.env.MONGO_DB_DATABASE) {
        throw new Error('MONGO_DB_DATABASE must be definded');
    }

    if (!process.env.APP_PORT) {
        throw new Error('APP_PORT must be definded');
    }

    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err)
    }
    
    app.listen(process.env.APP_PORT, () => { 
        console.log(`Listening on port ${process.env.APP_PORT} !!!`) 
    });
}

start();