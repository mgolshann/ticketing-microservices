import request from 'supertest';
import { app } from '../../app';

const apiUri = '/api/users/signin';

it('fails when a email that does not exist is supplied', async () => {
    return request(app)
        .post(apiUri)
        .send({
            email: 'mgbg@gmail.com',
            password: '123456'
        })
        .expect(400)
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'mgbg@yahoo.com',
            password: '123456'
        })
        .expect(201)

    await request(app)
        .post(apiUri)
        .send({
            email: 'mgbg@yahoo.com',
            password: '123456789'
        })
        .expect(400)
});

it('responses with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'mgbg@yahoo.com',
            password: '123456'
        })
        .expect(201)

    const response = await request(app)
        .post(apiUri)
        .send({
            email: 'mgbg@yahoo.com',
            password: '123456'
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
});
