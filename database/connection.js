const Database = require("./database")
const {HOST, USERNAME, PASSWORD, DATABASE, TABLE} = require('./../constants/database');
const database = new Database(HOST, USERNAME, PASSWORD, DATABASE);
database.connection.connect()
for (let key in TABLE){
    database.addTable(key, value)
}
module.exports = database