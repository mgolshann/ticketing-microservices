import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { insertTicket } from '../../test/helper';

it('returns 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 20
        })
        .expect(404)
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'test',
            price: 20
        })
        .expect(401)
});

// it('returns a 401 if the user does not own the ticket', async () => {
    
//     // first we insert a ticket with a random user
//     // random user is build in global.signin()
//     const response = await request(app)
//         .post('/api/tickets')
//         .set('Cookie', global.signin())
//         .send({
//             title: 'test1',
//             price: 10000
//         })
//         .expect(201)
    
//     // now check if new user authorized someone else ticket or not
//     // const previousTicketId = response.body.id;
//     // const randomUserSignin = global.signin();
//     await request(app)
//         .put(`/api/tickets/${response.body.id}`)
//         .set('Cookie', global.signin())
//         .send({
//             title: 'test1',
//             price: 300
//         })
//         .expect(401)
// });

it('returns a 400 if the user provided invalid title or price', async () => {

    // Inset a new ticket
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', global.signin())
        .send({
            title: 'test1',
            price: 3000
        })
        .expect(201)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 300
        })
        .expect(400)
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test2',
            price: -20
        })
        .expect(400)

    
});

it('updates the ticket provided valid inputs', async () => {

    // Notice:
    // Here we should use a uniqe userId in global.signin otherwise we will get an authrorized error
    // so we put in a variable
    const cookie = global.signin();

    // Inset a new ticket
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'test12',
            price: 3000
        })
        .expect(201)

    // we use the same cookie as above
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'test2',
            price: 1000
        })
        .expect(200)
    
    // we send a get request to see our ticket is changed or not
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()

    expect(ticketResponse.body.title).toEqual('test2');
    expect(ticketResponse.body.price).toEqual(1000)
});