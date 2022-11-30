const dbConfig = require('../config/dbConfig.js');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
    }
);

sequelize.authenticate()
.then(() => {
    console.log('connected to the local DB');
})
.catch(err => {
    console.log('Error'+ err);
    process.exit(1);
})
// sigterm

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./productModel.js')(sequelize, DataTypes);


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db;