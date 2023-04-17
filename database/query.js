const connection = require('./connection')
function get(tableName, condition="", choices="*"){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT ${choices} FROM ${tableName}${condition?" WHERE "+condition:""}`, function(err, result){
            resolve(result)
            reject(err)
        })
    })
}

function add(tableName, condition="", choices="*"){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT ${choices} FROM ${tableName}${condition?" WHERE "+condition:""}`, function(err, result){
            resolve(result)
            reject(err)
        })
    })
}

function edit(tableName, condition="", choices="*"){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT ${choices} FROM ${tableName}${condition?" WHERE "+condition:""}`, function(err, result){
            resolve(result)
            reject(err)
        })
    })
}

function remove(tableName, condition="", choices="*"){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT ${choices} FROM ${tableName}${condition?" WHERE "+condition:""}`, function(err, result){
            resolve(result)
            reject(err)
        })
    })
}
module.exports = {get, add, edit, remove}