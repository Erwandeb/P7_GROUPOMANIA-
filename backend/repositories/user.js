const {databaseclient }= require('./client');

exports.createUser = async (email, password) =>{
    return new Promise(resolve => {
        const sql = 'INSERT INTO user SET ?'
        databaseclient.query(sql, {email, password}, (error , result)=>{
        if(error){
            throw error
        }
        resolve(true);
    })
    })
}
