const express = require('express');
const mysql = require('mysql');
const userModel = require('./models/userModel');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'})
require('./config/database-config/dbConfig');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const path = require('path');
const { connect } = require('http2');


/**
 * TO DO:
 *  1 Créer une base de données
 *  2 Créer table User avec email et MDP
 *  3 Créer un user pour tester
 *  4 Connecter l'API à la base de données
 *  5 Créer un model user 
 *  6 tester un user avec Postman
 */

const app = express();


app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());



// Ressource
// https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia

/*

// Creat connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'groupomania'
});
*/

// Connect
/*
db.connect((err) =>{
    if(err){
        return err;
    }
    console.log('Mysql is connected with id: ' + db.threadId);
})
*/


/*
// Create user table
app.get('/createposttable', (req,res) =>{
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, email VARCHAR(255))'
    db.query(sql, (err, result)=>{
        if(error){
            return error
        }
        console.log(result);
        res.send('create user table')
    })
})
*/

// User routes
app.use('/api/auth/', userRoutes)


// Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Le serveur tourne sur le port ${process.env.PORT}.`)
})


