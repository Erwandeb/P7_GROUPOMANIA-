const router = require('express').Router();
const authController = require('../controllers/auth.controllers');


 
// Authentification
router.post('/signup', authController.signUp);
router.post("/login", authController.login);



// Add user
router.post('/user', (req,res) =>{
    let user = {
        titre: 'erwan',
        email:'test'
    }
    let sql = 'INSERT INTO user SET ?'
    let query = .query(sql, user, (err, result)=>{
        if(error){
            throw error
        }
        console.log(result);
        res.send('user has been added')
    })
  })


module.exports = router;