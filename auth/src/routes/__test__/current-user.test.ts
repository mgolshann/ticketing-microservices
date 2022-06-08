import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'mgbg@yahoo.com',
            password: '123456'
        })
        .expect(201)

    const cookie = authResponse.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
    
    // Supertest by default is not going to manage 
    // cookie for us automatically so the cookie that is generate
    // in the first request will not inlcluded in the second request 
    // so we have to get cookie from first request and pass it in the second one
    expect(response.body.currentUser.email).toEqual('mgbg@yahoo.com')
})