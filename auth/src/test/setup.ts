import { cookie } from 'express-validator';
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongoose = require("mongoose");
import request from 'supertest';
import { app } from '../app';


declare global {
    function signup(): Promise<string[]>
}

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
});


global.signup = async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'mgbg@yahoo.com',
            password: '123456'
        })
        .expect(201)
    
    const cookie = response.get('Set-Cookie')
    
    return cookie;
};