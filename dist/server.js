"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
// routers
const authorsRouter = require('./routes/api/authors');
const booksRouter = require('./routes/api/books');
const app = express_1.default();
//use routes
app.options('*', cors()); // preflight OPTIONS; put before other routes
//   BodyParser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// serve static folder according to node environment
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('/', (req, res) => {
        res
            .sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
else if (process.env.NODE_ENV === 'development') {
    app.use(express_1.default.static('static'));
    app.get('/', (req, res) => {
        res
            .sendFile(path_1.default.join(__dirname + 'index.html'));
    });
}
app.use('', booksRouter);
app.use('', authorsRouter);
app.use((req, res, next) => {
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
// mongodb connection via mongoose
mongoose
    .connect(database, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log(err));
// port: The app(server) will listen on this port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
