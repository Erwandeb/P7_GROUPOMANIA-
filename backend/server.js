const express = require('express');
const mysql = require('mysql');
const authentificationRoutes = require('./routes/auth.routes');
const dotenv = require('dotenv').config({path:'./config/.env'})

const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const path = require('path');
const { connect } = require('http2');

const { connection } = require('mongoose');
const {createUser} = require('./repositories/user');
const { REPL_MODE_STRICT } = require('repl');
const {databaseclient } = require('./repositories/client');

const app = express();


app.use(cors());
app.use(bodyparser.json());


// Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Le serveur tourne sur le port ${process.env.PORT}.`)
})



databaseclient.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('Mysql is connected');
});


app.use('/auth', authentificationRoutes);