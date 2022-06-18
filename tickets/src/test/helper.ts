import request from 'supertest';
import { app } from '../app';

export const insertTicket = async ({title, price}: any) => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title, price
        })
        .expect(201)
}