const express = require('express');
const mysql = require('mysql');
const userRoutes = require('./routes/user.routes');
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

/*
app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());
*/

// Ressource
// https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia


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


app.use('auth/', userRoutes);


/*
// Add user
app.get('/user', async (req,res) =>{
    let user = {
        email: 'erwan',
        password:'test'
    }
    await createUser('erwan', "test");
    return res.status(200).send("OK");
})
*/