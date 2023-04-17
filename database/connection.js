const mysql = require('mysql')
const {USERNAME, PASSWORD, DATABASE} = require('../constants/database')
const connection = mysql.createConnection({
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE
})
connection.connect()
module.exports = connection
