import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'mgbg@test.com',
            password: '123456'
        })
        .expect(201)
});

it('returna a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'retet',
            password: '34534tw'
        })
        .expect(400)
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'mgng@test.com',
            password: '123'
        })
        .expect(400)
});

it('returns 400 if we missing email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'mgbg@test.com'
        })
        .expect(400)
    
    await request(app)
        .post('/api/users/signup')
        .send({
            password: '123456'
        })
        .expect(400)
});

it('disallows duplicate emails', async () => {
    
    const user = { 
        email: 'ali@gmail.com',
        password: '123456'
    };

    await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(201)
    
    await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(400)
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ali@gmail.com',
            password: '123456'
        })
        .expect(201)
    
    expect(response.get('Set-Cookie')).toBeDefined();
})
