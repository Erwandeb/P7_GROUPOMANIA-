
// Create user table
app.get('/createposttable', (req,res) =>{
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, email VARCHAR(255))'
    db.query(sql, (err, result)=>{
        if(error){
            return error
        }
        console.log(result);
        res.send('create user table')
    })
})
