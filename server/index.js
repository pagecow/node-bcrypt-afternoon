require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();
const authCtrl = require('./controllers/authController');

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
})

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET, 
}))

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);

const port = SERVER_PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));