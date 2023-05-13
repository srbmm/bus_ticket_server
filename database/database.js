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

    customQuery(query, after) {
        this.connection.query(query, function (err, res) {
            after(err, res)
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

    get(after, condition = "", choices = "*", page = 0, count = 10, order_by = "", reverse = "ASC") {
        const connection = this.database.connection;
        if (page) {
            const tableName = this.tableName
            connection.query(`SELECT COUNT(*) FROM ${tableName}${condition ? " WHERE " + condition : ""}`, function (err, countAll) {
                const SQL = `SELECT ${choices} FROM ${tableName}${condition ? " WHERE " + condition : ""} ${order_by ?" ORDER BY " + order_by + " " + reverse.toUpperCase() + " " : ""}LIMIT ${count} OFFSET ${(page-1)*count};`
                console.log(SQL)
                connection.query(SQL, function (err, result) {
                    after(err, result, countAll[0]['COUNT(*)'])
                })
            })

        } else {
            const SQL = `SELECT ${choices} FROM ${this.tableName}${condition ? " WHERE " + condition : ""}${order_by ? " ORDER BY " + order_by + " " + reverse.toUpperCase() + " " : ""};`
            console.log(SQL)
            connection.query(SQL, function (err, result) {
                after(err, result)
            })
        }
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
        const connection = this.database.connection;
        const SQL = `INSERT INTO ${this.tableName} (${colNames}) VALUES (${values});`;
        console.log(SQL)
        connection.query(SQL, function (err, result) {
            after(err, result)
        })
    }

    edit(after, data, conditions) {
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
        const connection = this.database.connection;
        const SQL = `UPDATE ${this.tableName} SET ${data_str} ${conditions? "WHERE " + conditions: ""};`
        console.log(SQL)
        connection.query(SQL, function (err, result) {
            after(err, result)
        })
    }

    remove(after, condition) {
        if (condition) {
            const connection = this.database.connection
            const SQL = `DELETE FROM ${this.tableName} WHERE ${condition};`
            console.log(SQL)
            connection.query(SQL, function (err, result) {
                after(err, result)
            })
        } else
            throw new Error("please add condition")
    }
}

module.exports = Database