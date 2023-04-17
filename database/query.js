const connection = require('./connection')
const { TABLE } = require("./../constants/database")
function get(tableName, condition="", choices="*"){
    if (Object.values(TABLE).includes(tableName)) {
        return new Promise((resolve, reject) => {
            connection.connect()
            connection.query(`SELECT ${choices} FROM ${tableName}${condition ? " WHERE " + condition : ""}`, function (err, result) {
                resolve(result)
                reject(err)
                connection.end()
            })
        })
    }else {
        throw new Error("Couldn't find table " + tableName)
    }
}

function add(tableName, data){
    if (Object.values(TABLE).includes(tableName)) {
        let colNames = ""
        let values = ""
        let counter = 0
        const keys = Object.keys(data)
        for (let key of keys){

            if(counter === keys.length - 1){
                colNames += `${key}`
                if (key === "password") values += `MD5('${data[key]}')`
                else values += `'${data[key]}'`
            }else{
                colNames += `${key}, `
                if (key === "password") values += `MD5('${data[key]}'), `
                else values += `'${data[key]}', `
            }
            counter += 1
        }
        return  new Promise((resolve, reject) =>{
            connection.connect()
            connection.query(`INSERT INTO ${tableName} (${colNames}) VALUES (${values});`,
            function(err, result){
                resolve(result)
                reject(err)
                connection.end()
            })})
    }else {
        throw new Error("Couldn't find table " + tableName)
    }
}

function edit(tableName, data, conditions){
    if(conditions) {
        if (Object.values(TABLE).includes(tableName)) {
            let data_str = ""
            let counter = 0
            const keys = Object.keys(data)
            for (let key of keys) {
                if (counter === keys.length - 1) {
                    data_str += `${key} = ${data[key]}`
                } else {
                    data_str += `${key} = ${data[key]}, `
                }
                counter += 1
            }
            connection.connect()
            return new Promise((resolve, reject) => {
                connection.query(`UPDATE ${tableName} SET ${data_str} WHERE ${conditions};`, function (err, result) {
                    resolve(result)
                    reject(err)
                    connection.end()
                })
            })
        }else{
            throw new Error ('please add condition')
        }
    }else {
        throw new Error("Couldn't find table " + tableName)
    }
}

function remove(tableName, condition){
    if (Object.values(TABLE).includes(tableName)) {
        if (condition) {
            return new Promise((resolve, reject) => {
                connection.connect()
                connection.query(`DELETE FROM ${tableName} WHERE ${condition};`, function (err, result) {
                    resolve(result)
                    reject(err)
                    connection.end()
                })
            })
        }else throw new Error("please add condition")
    }else {
        throw new Error("Couldn't find table " + tableName)
    }
}
module.exports = {get, add, edit, remove}