import { MongoMemoryServer } from 'mongodb-memory-server';
const mongoose = require("mongoose");
import jwt from 'jsonwebtoken';

declare global {
    function signin(): string[]
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


global.signin = () => {
    // Build a JWT payload.  { id, email }
    // we need random id for checking previous user
    // authorized to access a route or not
    const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
    };

    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_TOKEN!);

    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    // Return a string has the cookie with the encoded data
    // The expectation when we use supertest is include all of 
    // different cookies in array so we have to use [] at the end
    
    // return [`session=${base64}`]
    return [
        'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall5WVdGbU1XUTBOamhqWW1WbFlUZ3hOR0l4TkRBellpSXNJbVZ0WVdsc0lqb2liV2RpWjBCNVlXaHZieTVqYjIwaUxDSnBZWFFpT2pFMk5UVXpOekF4T1RaOS40X3hXTDhTcWRyT3lTX0padXM1WGVSSmpBQXZyRjl3b3U0b25aVmZjc3FRIn0=; path=/; expires=Fri, 17 Jun 2022 09:03:16 GMT',
        'session.sig=U5LXM6D0wrLytF63WjLy0aoTLKw; path=/; expires=Fri, 17 Jun 2022 09:03:16 GMT'
    ];
};