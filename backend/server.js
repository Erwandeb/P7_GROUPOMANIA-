const express = require('express');
const mysql = require('mysql');
const authentificationRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/posts.routes');
const likesRoutes = require('./routes/likes.routes');
const commentRoutes = require('./routes/comment.routes');
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


app.use(cors());
app.use(bodyparser.json());


// Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}.`)
})



databaseclient.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('Database is connected');
});


app.use('/auth', authentificationRoutes);
app.use('/post', postRoutes);
//app.use('/like', likesRoutes);
app.use('/comment', commentRoutes);
//app.use('/comment', userRoutes);