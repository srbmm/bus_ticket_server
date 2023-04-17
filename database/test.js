const connection = require('./connection')
const {get, add, } = require('./query')
const md5 = require("md5")
const {TABLE} = require('./../constants/database')
// get('', 'id=36').then(rows => console.log(rows))
//add(TABLE.admin, {username: "ali", password: "rezaee", name: "ali"}).then(res => console.log(res)).catch(err => console.log("----",err))
get(TABLE.admin, "admin_id=7").then(res => {
    console.log(md5('rezaee') === res[0].password)
})