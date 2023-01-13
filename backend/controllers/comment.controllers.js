const {databaseclient } = require('../repositories/client');
const fs = require("fs");


exports.createComment = (req, res, next) => {
    const comment = {
        text : req.body.text,
        rattachedPostId : req.body.rattachedPostId,
        authorId : req.userId,
    }

    let sql = `INSERT INTO comments (CONTENU, RATTACHED_POST_ID , AUTHOR_ID) VALUES (?,?,?);`;

    databaseclient.query(sql, [comment.text, comment.rattachedPostId, comment.authorId ], function (err, result) {
        if (err) {
            return res.status(500).json({
                error: 'Internal server error'
            });
        };
        res.status(201).json({ message: `Commentaire ajouté` });
    })
    
};


exports.getAllComment = (req, res) => {

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  const sql = `SELECT * FROM comments WHERE RATTACHED_POST_ID = ${req.params.postId} LIMIT ${limit} OFFSET ${offset};`
  databaseclient.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'Error fetching comments'
      });
    }
    res.status(200).json(results);
  });

};


exports.modifyComment = (req, res, next) => {

    let sqlCheckBase = `SELECT * FROM comments WHERE  ID = ${req.params.commentId};`;
    databaseclient.query(sqlCheckBase, function (err, result) {
    
        if(result && req.userId === result[0].AUTHOR_ID){
            const textCommentModified = {
                text : req.body.text
            }
            
            let sql = `UPDATE comments SET CONTENU = ? WHERE ID = ${req.params.commentId}`;
            databaseclient.query(sql, [textCommentModified.text], function (err, result) {
                if (err) {
                    return res.status(500).json({
                        error: 'Internal server error'
                    });
                };
                res.status(201).json({ message: `Commentaire modifié` });
            })
            
        } else{
            res.status(400).json({ message: `bad request` });
        }
    
    })

};


exports.deleteComment = (req, res, next) => {

    let sqlCheckBase = `SELECT * FROM comments WHERE  ID = ${req.params.commentId};`;
    databaseclient.query(sqlCheckBase, function (err, result) {
        if(result && req.userId === result[0].AUTHOR_ID ){
      
            let sql = `DELETE FROM comments WHERE  ID = ${req.params.commentId};`;
            databaseclient.query(sql,  function (err, result) {
                if (err) {
                    return res.status(500).json({
                        error: 'Internal server error'
                    });
                };
                res.status(201).json({ message: `Commentaire supprimé` });
            })
        } else{
            res.status(400).json({ message: `bad request` });
        }
    })
    
};
