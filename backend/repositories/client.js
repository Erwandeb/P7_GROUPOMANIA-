const mysql = require('mysql');

const databaseclient = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'groupomania'
})
exports.databaseclient = databaseclient;