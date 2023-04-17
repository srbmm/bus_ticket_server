const connection = require('./connection')
const {get} = require('./query')
get('test', 'id=36').then(rows => console.log(rows))
connection.end()