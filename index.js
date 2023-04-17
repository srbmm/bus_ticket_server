const express = require('express')
const app = express()
const port = 3000
const connection = require('./database/connection')
app.use(express.json())

// let counter = 0
//
// for (const item of data) {
//     if(counter !== 0 && item) {
//         let temp = item.split(',')
//         connection.query(`INSERT INTO test (id, first_name, last_name, email, gender, city, job) VALUES (${temp[0]}, "${temp[1]}", "${temp[2]}", "${temp[3]}", "${temp[4]}", "${temp[5]}", "${temp[6]}");`)
//     }
// }
//
//

app.get('/hi/:id', (req, res) => {
    res.status(200).send('hi')
})
app.get('/male', (req, res) => {
    connection.query('SELECT MIN(id) FROM test WHERE id>20 AND gender="male"', (err, rows, fields) => {
        if (err) throw err
        console.log('The solution is: ', rows)
        res.status(200).send(rows)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}, (err, res) => {
    console.log(`Example app listening on port ${port}----`)
})
