import { MongoMemoryServer } from 'mongodb-memory-server';
const mongoose = require("mongoose");
import { app } from '../app';

let mongo: any;

beforeAll(async () => {
    
    process.env.JWT_TOKEN = 'asdf';

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Delete all collections before each test
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// Close connection after finishing all test
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})