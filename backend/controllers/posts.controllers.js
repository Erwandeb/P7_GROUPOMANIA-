const {databaseclient } = require('../repositories/client');
const fs = require("fs");


// 401 = Token dans postman 


/*
 * 
 * FINI
 *  
 */ 
exports.createPost = (req, res, next) => {
    
    const post = {
        text : req.body.text,
        posImageUrl : req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : null,
    }

    let sql = `INSERT INTO posts (CONTENT, IMAGES, AUTHOR_ID) VALUES (?,?,?);`;

    databaseclient.query(sql, [post.text, post.posImageUrl, req.userId], function (err, result) {
        if(err) {
            throw err;
        }
        res.status(201).json({ message: `Post ajouté` });
    })
    
};



/*
 * 
 * A finir :
 * 
 * 
 */ 
exports.getAllPost = (req, res, next) => {
    /*
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

    let sqlCount = "SELECT COUNT(*) AS count FROM posts";
    databaseclient.query(sqlCount, function (err, resultCount) {
        if(err) {
            throw err;
        }
        let sql = `SELECT * FROM posts ORDER BY TIMEPOSTED DESC LIMIT ? OFFSET ?`;
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
*/
};


/*
 * - FINI
 *  filtrer par ID du post
 */ 
exports.getOnePost = (req, res, next) => {
    let postid = req.params.postid;
    let sql = `SELECT * FROM posts WHERE ID = ${post} ORDER BY TIMEPOSTED DESC LIMIT 1`;

    databaseclient.query(sql, function (err, result) {
        if(err) {
            throw err;
        }
          res.status(200).json(result);
    });
    
};


/*
 * 
 * A finir :
 * - Gestion de la suppression des images dans la BDD
 *  
 */ 
exports.modifyPost = (req, res, next) => {
 
    /**
     * 
     * Verification avec une requete SQL 
     * Si oui : traiter information
     * Si non : bad request
     * 
     * 
     * A revoir :
     * Supprimer les éléments de la base et cleanner les images 
     * Puis refaire une requete pour remplacer avec les éléments qui ont été donnés en Front
     * En 2 temps
     * 
     */

    const post = {
        text : req.body.text,
        posImageUrl : req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`: null,
        postId : req.params.postid,
    }

    let sqlCheckBase = `SELECT * FROM posts WHERE  ID = ${req.params.postid};`;
    databaseclient.query(sqlCheckBase, function (err, result) {
        console.log(result[0].IMAGES);

        if(result){
            console.log("requete client", post.posImageUrl);
            console.log('retour BDD', result[0].IMAGES);

            if(result[0].IMAGES != post.posImageUrl){ 
                console.log("supp");

                fs.unlink(`images/posts/${req.file.filename}`, () => {
                    console.log(`${req.file.filename} à été supprimé de la base`);
                });
            }

            // PROBLEME : l'image est supprimé au moment de sa création 

            let sql = `UPDATE posts SET CONTENT = ? , IMAGES = ? WHERE ID = ?`;
            databaseclient.query(sql, [post.text, post.posImageUrl, post.postId], function (err, result) {
                if(err) {
                    throw err;
                }
                res.status(201).json({ message: `Post modifié` });
            })
        }

    })

};



/*
 * 
 * A finir :
 * FINI
 * 
 */ 
exports.deletePost = (req, res, next) => {

    let sqlCheckBase = `SELECT * FROM posts WHERE  ID = ${req.params.postid};`;
    databaseclient.query(sqlCheckBase,function (err, result) {
        if(result){
            if(result[0].IMAGES != null){
                fs.unlink(`images/posts/${req.file.filename}`, () => {
                    console.log(`${req.file.filename} à été supprimé de la base`);
                });
            }
            let sql = `DELETE FROM posts WHERE  ID = ${req.params.postid};`;
            databaseclient.query(sql,  function (err, result) {
                if(err) {
                    throw err;
                }
                res.status(201).json({ message: `Post supprimé` });
            })
        }
    })

};




// role base access control
/*
    const getResources = async (req, res) => {
        const {page, limit} = req.query
        if (parseInt(limit) <= 0 || parseInt(limit) > 100) {
            return res.status(400).send()
        }

        const resources = await getResourcesPaginated(page, limit)
        const totalCount = await getTotalCount()

        return {
            totalCount: totalCount,
            itemCount: resources.length,
            items: resources,
            totalPage: Math.ceil(totalCount / limit),
            nextPage: page === Math.ceil(totalCount / limit) ? null : page + 1,
            previousPage: page === 0 ? null : 1
        }
    }

    const getTotalCount = async () => {
        return await mysql.query(
            `
                SELECT COUNT(*) as count
            `
        )
    }

    const getResourcesPaginated = async (page, limit) => {
        return await mysql.query(
            `
                SELECT * 
                FROM resources
                WHERE resources.id >= ${page * limit}
                LIMIT ${limit}
            `
        )
    }


    // http://localhost:3000/api/posts?page=0&limit=20

    // offset / page === indicateur pour savoir à partir d'où l'on effectue la recherche.
    // limit === Nombre d'éléments max à retourner.
*/