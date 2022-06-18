import request from 'supertest';
import { app } from '../../app';
import { insertTicket } from '../../test/helper';

it('cat fetch a list of tickets', async () => {

    await insertTicket({ title: 'test 1', price: 10 });
    await insertTicket({ title: 'test 2', price: 20 });
    await insertTicket({ title: 'test 3', price: 30 });
    
    const response = await request(app)
        .get('/api/tickets')
        .send({})
        .expect(200)

    expect(response.body.length).toEqual(3)
});
