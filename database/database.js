const mysql = require("mysql");
const md5 = require("md5");

class Database {
    constructor(host, username, password, database) {
        this.connection = mysql.createConnection({
            host: host,
            user: username,
            password: password,
            database: database
        })
    }

    addTable(name, sqlName) {
        this[name] = new Table(sqlName, this)
    }
}

class Table {
    constructor(tableName, database) {
        this.database = database
        this.tableName = tableName
    }

    get(after, condition = "", choices = "*") {
        const connection = this.database.connection
        connection.query(`SELECT ${choices} FROM ${this.tableName}${condition ? " WHERE " + condition : ""};`, function (err, result) {
            after(err, result)
        })
    }

    add(after, data) {
        let colNames = ""
        let values = ""
        let counter = 0
        const keys = Object.keys(data)
        for (let key of keys) {
            if (typeof data[key] === "string" && key !== 'password') {
                data[key] = `'${data[key]}'`
            }
            if (counter === keys.length - 1) {
                colNames += `${key}`
                if (key === "password") values += `'${md5(data[key])}'`
                else values += `${data[key]}`
            } else {
                colNames += `${key}, `
                if (key === "password") values += `'${md5(data[key])}', `
                else values += `${data[key]}, `
            }
            counter += 1
        }
        const connection = this.database.connection
        connection.query(`INSERT INTO ${this.tableName} (${colNames}) VALUES (${values});`, function (err, result) {
            after(err, result)
        })
    }

    edit(after, data, conditions) {
        if (conditions) {
            let data_str = ""
            let counter = 0
            const keys = Object.keys(data)
            for (let key of keys) {
                if (typeof data[key] === "string" && key !== 'password') {
                    data[key] = `'${data[key]}'`
                }
                if (counter === keys.length - 1) {
                    if (key === "password") data_str += `${key} = '${md5(data[key])}'`
                    else data_str += `${key} = ${data[key]}`
                } else {
                    if (key === "password") data_str += `${key} = '${md5(data[key])}',`
                    else data_str += `${key} = ${data[key]}, `
                }
                counter += 1
            }
            const connection = this.database.connection
            connection.query(`UPDATE ${this.tableName} SET ${data_str} WHERE ${conditions};`, function (err, result) {
                after(err, result)
            })
        } else {
            throw new Error('please add condition')
        }
    }

    remove(after, condition) {
        if (condition) {
            const connection = this.database.connection
            connection.query(`DELETE FROM ${this.tableName} WHERE ${condition};`, function (err, result) {
                after(err, result)
            })
        } else
            throw new Error("please add condition")
    }

}

module.exports = Database