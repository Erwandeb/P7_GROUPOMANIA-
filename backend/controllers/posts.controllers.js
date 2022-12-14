const {databaseclient } = require('../repositories/client');
const fs = require("fs");


exports.createPost = (req, res, next) => {
   
    const text = (req.body.text) ? req.body.text : " ";

    const post = {
        text: text,
        like: 0,
        date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
        authorId: req.body.userId,
    };

    let sql = `INSERT INTO post (text, imageUrl, date, authorId) VALUES (?,?,?,?);`;
    databaseclient.execute(sql, [post.text, post.imageUrl, post.date, post.authorId], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Post ajouté` });
    })
};
