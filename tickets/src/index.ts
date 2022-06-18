const mongoose = require("mongoose");
import { app } from './app';

// Connecting to mongodb 
const start = async () => {

    if (!process.env.JWT_TOKEN) {
        throw new Error('JWY_TOKEN must be definded');
    }
    
    if (!process.env.APP_PORT) {
        throw new Error('APP_PORT must be definded');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be definded');
    }
 
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_URI}`, {
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