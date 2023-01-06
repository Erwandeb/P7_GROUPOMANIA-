const {databaseclient } = require('../repositories/client');
const fs = require("fs");


exports.createComment = (req, res, next) => {

    const comment = {
        text : req.body.text,
        rattachedPostId : req.body.rattachedPostId,
        authorId : req.body.authorId
    }

    let sql = `INSERT INTO comments (CONTENU, RATTACHED_POST_ID , AUTHOR_ID) VALUES (?,?,?);`;

    databaseclient.query(sql, [comment.text, comment.rattachedPostId, comment.authorId ], function (err, result) {
        if(err) {
            throw err;
        }
        res.status(201).json({ message: `Post ajouté` });
    })
    
};


exports.getAllComment = (req, res, next) => {
    
    let page = 0 ;
    let limit = 15;
    
    if(req.query.page){
        page = parseInt(req.query.page);
    }
    if(req.query.limit){
        const queryLimit = parseInt(req.query.limit);
        if(queryLimit <= 0 || queryLimit > 20 ){
            return res.status(400).json({message:"bad request: limit must be between 1 to 20"})
        }
        limit = queryLimit;
    }

    let sqlCount = "SELECT COUNT(*) AS count FROM comments";
    databaseclient.query(sqlCount, function (err, resultCount) {
        if(err) {
            throw err;
        }
        let sql = `SELECT * FROM comments JOIN posts ON comments.RATTACHED_POST_ID = posts.ID TOTAL ORDER BY DATETIME DESC`;
        databaseclient.query(sql, [limit, page*limit,], function (err, result) {
            if(err) {
                throw err;
            }
            res.status(200).json(result);

            const auto =  {
                items : [],
                totalCount : 0,
                totalPage: Math.ceil(totalCount / limit),
                nextPage: page < totalPage ? page + 1 : null,
                previousPage:page > 0 ? page - 1 : null ,
            }

        });
    });
};

/*
exports.getAllComment = (req, res, next) => {
    
    let sql = `SELECT * FROM comments JOIN posts ON comments.RATTACHED_POST_ID = posts.ID `;
    //let sql = `SELECT * FROM comments `;
    databaseclient.query(sql, function (err, result) {
        if(err) {
            throw err;
        }
        res.status(200).json(result);

    });
    
};
*/


exports.modifyComment = (req, res, next) => {

    let sqlCheckBase = `SELECT * FROM comments WHERE  ID = ${req.params.id};`;
    databaseclient.query(sqlCheckBase, function (err, result) {
    
        if(result){
            const textCommentModified = {
                text : req.body.text
            }
            
            let sql = `UPDATE comments SET CONTENU = ? WHERE ID = ${req.params.id}`;
            databaseclient.query(sql, [textCommentModified.text], function (err, result) {
                if(err) {
                    throw err;
                }
                res.status(201).json({ message: `Post modifié` });
            })
            
        }

    })

};



exports.deleteComment = (req, res, next) => {

    let sqlCheckBase = `SELECT * FROM comments WHERE  ID = ${req.params.id};`;
    databaseclient.query(sqlCheckBase, function (err, result) {
        if(result){
      
            let sql = `DELETE FROM comments WHERE  ID = ${req.params.id};`;
            databaseclient.query(sql,  function (err, result) {
                if(err) {
                    throw err;
                }
                res.status(201).json({ message: `Post supprimé` });
            })
        }
    })
    
};
