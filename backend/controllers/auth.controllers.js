const dotenv = require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {databaseclient } = require('../repositories/client');
const fs = require("fs");


exports.signUp = (req, res) => {
  
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message:"bad request"})
  }
  const sql = `SELECT * FROM user WHERE email=? LIMIT 1`;
  databaseclient.query( sql, email, (err, result) =>{

    if(result.length > 0){
      return res.status(400).json({message:"bad request"})
    }
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = {
            email: req.body.email,
            password: hash,
          }
          const sql = `INSERT INTO user (email, password) VALUES (?,?)`;
          databaseclient.query(sql, [user.email, user.password], function (err, result) {
              if (err) throw err;
              res.status(201).json({ message: `Utilisateur ajouté` });
          })
      })
      .catch(error => res.status(500).json({ error }));
    })
};



exports.login = (req, res, next) => {

  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message:"bad request"})
  }

  const sql = `SELECT * FROM user WHERE email=? LIMIT 1`;
  databaseclient.query(sql, email, function (err, result) {
    
    let user = result[0];
    if (!user){
      return res.status(400).json({message:"bad request"})
    }
    bcrypt.compare(password, user.PASSWORD)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: "Ressource not found" });
        }

        res.status(200).json({
          userId: user.ID,
          token: jsonWebToken.sign(
              { userId: user.ID },
              process.env.SECURITY_TOKEN,
              { expiresIn: "24h" },
          ),

        })
      })
      .catch((error) => res.status(500).json({  error :"internal serveur error"}));
  })
};