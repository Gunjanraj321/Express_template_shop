// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host : 'localhost',
//     user : 'root',
//     database : 'Products',
//     password : '12345678'
// })

// module.exports = pool.promise();

const Sequelize = require("sequelize")

const sequelize = new Sequelize('Products','root','12345678', {
    dialect : 'mysql', 
    host:'localhost',
})

module.exports = sequelize;