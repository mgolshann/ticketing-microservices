import express, { Request, Response } from 'express';

const router = express.Router();

export const Router1 = router.post('/api/users/signup', (req: Request, res: Response) => {

    req.session = {
        jwt: 'salam'
    };

    res.send({});
});


export const Router2 = router.get('/api/users/currentuser', (req: Request, res: Response) => {

    console.log(req.session?.jwt);
    

    res.send({});
});


