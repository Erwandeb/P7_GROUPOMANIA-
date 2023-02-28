const {databaseclient } = require('../repositories/client');
const fs = require("fs");


exports.createPost = (req, res, next) => {
    
    const post = {
        text : req.body.text,
        posImageUrl : req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : null,
    }

    let sql = `INSERT INTO posts (CONTENT, IMAGES, AUTHOR_ID) VALUES (?,?,?);`;

    databaseclient.query(sql, [post.text, post.posImageUrl, req.userId], function (err, result) {
        if(err) {
            console.log(err);
            res.status(500).json({ message: `Error: ${err}` });
            return;
        }
        res.status(201).json({ message: `Post ajouté` });
    })
    
};


exports.getAllPost = (req, res, next) => {
    
    let page = 0 ;
    let limit = 15;
    let totalCount;
    let totalPage;
    
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

    let sqlCount = "SELECT COUNT(*) AS count FROM posts";
    databaseclient.query(sqlCount, function (err, resultCount) {
        if(err) {
            throw err;
        }
        totalCount = resultCount[0].count;
        let sql = `SELECT * FROM posts ORDER BY TIMEPOSTED DESC LIMIT ? OFFSET ?`;
        databaseclient.query(sql, [limit, page*limit,], function (err, result) {
            if(err) {
                console.log(err);
                res.status(500).json({ message: `Error: ${err}` });
                return;
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



exports.getOnePost = (req, res, next) => {
    let postid = req.params.postid;
    let sql = `SELECT * FROM posts WHERE ID = ${post} ORDER BY TIMEPOSTED DESC LIMIT 1`;

    databaseclient.query(sql, function (err, result) {
        if(err) {
            console.log(err);
            res.status(500).json({ message: `Error: ${err}` });
            return;
        }
          res.status(200).json(result);
    });
    
};



exports.modifyPost = (req, res, next) => {
 
    let sqlCheckBase = `SELECT * FROM posts WHERE  ID = ${req.params.postid};`;
    databaseclient.query(sqlCheckBase, function (err, result) {
    
        if(result && req.userId === result[0].AUTHOR_ID){

            const imageNameFromFrontend = req.file ? req.file.filename : null;
            let imageNameFromDatabase = null;

            if(result[0].IMAGES != null){

                imageNameFromDatabase = result[0].IMAGES.split('/images/posts/')[1];

                if(imageNameFromDatabase != imageNameFromFrontend){ 
                    fs.unlink(`images/posts/${imageNameFromDatabase}`, () => {
                        console.log(`${imageNameFromDatabase} à été supprimé de la base`);
                    });
                }
            }

            const newElementFromPostModified = {
                text : req.body.text,
                posImageUrl : req.file ? `${req.protocol}://${req.get('host')}/images/posts/${imageNameFromFrontend}`: null,
            }

            let sql = `UPDATE posts SET CONTENT = ? , IMAGES = ? WHERE ID = ${req.params.postid}`;
            databaseclient.query(sql, [newElementFromPostModified.text, newElementFromPostModified.posImageUrl], function (err, result) {
                if(err) {
                    console.log(err);
                    res.status(500).json({ message: `Error: ${err}` });
                    return;
                }
                res.status(201).json({ message: `Post modifié` });
            })
        }else{
            res.status(400).json({ message: `Bad Request` });
        }

    })

};



exports.deletePost = (req, res, next) => {

    let sqlCheckBase = `SELECT * FROM posts WHERE  ID = ${req.params.postid};`;
    databaseclient.query(sqlCheckBase,function (err, result) {
        if(result && req.userId === result[0].AUTHOR_ID){
            if(result[0].IMAGES != null){
                fs.unlink(`images/posts/${req.file.filename}`, () => {
                    console.log(`${req.file.filename} à été supprimé de la base`);
                });
            }
            let sql = `DELETE FROM posts WHERE  ID = ${req.params.postid};`;
            databaseclient.query(sql,  function (err, result) {
                if(err) {
                    console.log(err);
                    res.status(500).json({ message: `Error: ${err}` });
                    return;
                }
                res.status(201).json({ message: `Post supprimé` });
            })
        }else{
            res.status(400).json({ message: `Bad Request` });
        }
    })

};
