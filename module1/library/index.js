const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const userApiRouter = require('./routes/api/user');

const booksRouter = require('./routes/books');

const counterRouter = require('./routes/counter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use(cors());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/counter', counterRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'todos';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

async function start() {
    try {
        
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();