const {databaseclient} = require('../repositories/client');
const fs = require("fs");
const { post } = require('../routes/comment.routes');

exports.getAllLikes = (req, res) => {

    const sql = `SELECT * FROM likes WHERE RATTACHED_POST_ID = ${req.params.postId};`

    databaseclient.query(sql, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: `Error: ${err}` });
            return;
        }
      res.status(200).json(results.length);
    });

};

exports.liked = (req, res) => {
    const like = {
        authorId : req.userId,
        postId : req.params.postId
    }

    let sqlCheckBase = `SELECT * FROM likes WHERE RATTACHED_POST_ID = ?;`;
    databaseclient.query(sqlCheckBase, [like.postId], function (err, result) {
    
        let checkAuthorLike;
        for(let item of result) {
            if (like.authorId == item.AUTHOR_ID && like.postId == item.RATTACHED_POST_ID) {
                checkAuthorLike = true;
            }
        }
 
        if(checkAuthorLike === true){
            let sqlDelete = `DELETE FROM likes WHERE AUTHOR_ID = ?`;
            databaseclient.query(sqlDelete, like.authorId, function (err, result) {
                if(err) {
                    console.log(err);
                    res.status(500).json({ message: `Error: ${err}` });
                    return;
                }
                res.status(201).json({ message: `like du post ${like.postId} est supprimé` });
            });
        } else {
            let sqlInsert = `INSERT INTO likes (RATTACHED_POST_ID , AUTHOR_ID) VALUES (?,?);`;
            databaseclient.query(sqlInsert, [like.postId, like.authorId ], function (err, result) {
                if(err) {
                    console.log(err);
                    res.status(500).json({ message: `Error: ${err}` });
                    return;
                }
                res.status(201).json({ message: `le post ${like.postId} est liké` });
            })         
        }
    })


};