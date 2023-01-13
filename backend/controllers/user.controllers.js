const {databaseclient } = require('../repositories/client');
const fs = require("fs");


exports.modifyUser = (req, res, next) => {
 
    let sqlCheckBase = `SELECT * FROM user WHERE  ID = ${req.userId};`;
    databaseclient.query(sqlCheckBase, function (err, result) {

        if(result && req.userId === result[0].ID){

            const imageNameFromFrontend = req.file ? req.file.filename : null;
            let imageNameFromDatabase = null;

            if(result[0].IMAGES != null){
                imageNameFromDatabase = result[0].IMAGES.split('/images/posts/')[1];
                if(imageNameFromDatabase != imageNameFromFrontend){ 
                    fs.unlink(`images/profil-pictures/${imageNameFromDatabase}`, () => {
                        console.log(`${imageNameFromDatabase} à été supprimé de la base`);
                    });
                }
            }
        
            const newInformationsUser = {
                pseudo : req.body.pseudo,
                nom : req.body.nom,
                prenom : req.body.prenom,
                photoProfil : req.file ? `${req.protocol}://${req.get('host')}/images/profil-pictures/${imageNameFromFrontend}`: null,
            }

            let sqlModifyUserData = `UPDATE user SET  PHOTO_PROFIL = '${newInformationsUser.photoProfil}', PSEUDO = '${newInformationsUser.pseudo}', NOM = '${newInformationsUser.nom}', PRENOM = '${newInformationsUser.prenom}'  WHERE ID = ${req.userId};`;
            databaseclient.query(sqlModifyUserData, function (err, result) {
                if(err) {
                    console.log(err);
                    res.status(500).json({ message: `Error: ${err}` });
                    return;
                }
                res.status(201).json({ message: `L'utilisateur a été modifié` });
            })
        }else{
            res.status(400).json({ message: `Bad Request` });
        }
        
    })
};

