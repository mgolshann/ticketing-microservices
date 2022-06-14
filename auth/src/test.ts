var cookieSession = require('cookie-session')
import express,{ Request, Response } from 'express';

var app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/test',  (req: Request, res: Response) => {
    console.log(req.session?.view);
    // Write response
    res.send({})
  })

app.get('/', (req:Request, res:Response) => {
  // Update views
  req.session = {
    view: 123
  };
  console.log('created');
  // Write response
  res.send({})
})

app.listen(3000)