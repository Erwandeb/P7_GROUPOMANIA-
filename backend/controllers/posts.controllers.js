const {databaseclient } = require('../repositories/client');
const fs = require("fs");


// ne pas oublier de le token dans postman
exports.createPost = (req, res, next) => {
    
    const {text, authorId} = req.body;
    if(!text || !authorId){
        return res.status(400).json({message:"bad request"})
    }

    const post = {
        text: text,
        authorId: authorId
    };

    let sql = `INSERT INTO posts (CONTENT, AUTHOR_ID) VALUES (?,?);`;
    databaseclient.query(sql, [post.text, post.authorId], function (err, result) {
        if(result.length > 0){
            return res.status(400).json({message:"bad request"})
        }
        if(err) {
            throw err;
        }
        res.status(201).json({ message: `Post ajouté` });
    })

};

exports.getAllPost = (req, res, next) => {
      let sql = "SELECT * FROM posts WHERE AUTHOR_ID ORDER BY TIMEPOSTED DESC LIMIT 15;";
      databaseclient.query(sql, function (err, result) {
        if(err) {
            throw err;
        }
          res.status(200).json(result)
      });
};

exports.getOnePost = (req, res, next) => {
    let author = req.params.authorid;
    let sql = `SELECT * FROM posts WHERE AUTHOR_ID = ${author} ORDER BY TIMEPOSTED DESC LIMIT 15`;

    databaseclient.query(sql,   function (err, result) {
        if(err) {
            throw err;
        }
          res.status(200).json(result)
      });
    
};

exports.modifyPost = (req, res, next) => {
    
};


exports.deletePost = (req, res, next) => {

  
    let idPost = req.params.postid;
    let sql = `DELETE FROM posts WHERE  ID = ${idPost};`;
    
    databaseclient.query(sql, function (err, result) {
        if(!result){
            return res.status(400).json({message:"bad request"})
        }
        if(err) {
            throw err;
        }
        res.status(201).json({ message: `Post supprimé` });
    })
    
};


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