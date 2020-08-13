import express, { Application, Request, Response, NextFunction } from 'express';

const cors = require('cors');
const bodyParser = require('body-parser');

const app:Application = express();

//use routes
app.options('*', cors()); // preflight OPTIONS; put before other routes


app.use((req: Request, res:Response, next:NextFunction) => {

    // Website you wish to allow to connect: In this case, the frontend running on port 3000
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Pass to next layer of middleware
    next();
});

app.get('/', (req: Request, res:Response) => {
    res.send('Hello World!');
});

//   BodyParser Middleware
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

// api endpoints

// mongodb connection via mongoose

// port: The app(server) will listen on this port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));