var mysql = require('mysql')
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        title: 'Hello World',
        date: 'Today'
    })
})

app.get('/user', (req, res) => {
    res.json({
        username: 'Yeo',
        email: 'yeo@gmail.com',
        password: null
    })
})

app.post('/db/retrieve/:username', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'myapp'
    })

    connection.connect()

    connection.query(`SELECT * FROM accounts where username = '${req.params.username}'`, function (err, rows, fields) {
        if (err) throw err

        // console.log('The solution is: ', rows[0].solution)
        res.json({
            data:rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})

app.get('/db/insert/:username/:email/:password', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'myapp'
    })

    connection.connect()
    connection.query(`INSERT INTO accounts (username,email,password) VALUES ('${req.params.username}','${req.params.email}', '${req.params.password}')`, function (err, rows, fields) {
        if (err) throw err

        // console.log('The solution is: ', rows[0].solution)
        res.json({
            data:rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})

// app.get('/db/update/:username/:email/:password', (req, res) => {
//     var connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'myapp'
//     })

//     connection.connect()
//     connection.query(`UPDATE accounts SET username='${req.params.username}',email='${req.params.email}',password='${req.params.password}' WHERE id=1`, function (err, rows, fields) {
//         if (err) throw err

//         // console.log('The solution is: ', rows[0].solution)
//         res.json({
//             data:rows,
//             params: req.params,
//             username: req.params.username
//         })
//     })

//     connection.end()
// })

// app.get('/db/delete', (req, res) => {
//     var connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'myapp'
//     })

//     connection.connect()
//     connection.query(`DELETE FROM accounts WHERE id=1`, function (err, rows, fields) {
//         if (err) throw err

//         // console.log('The solution is: ', rows[0].solution)
//         res.json({
//             data:rows,
//             params: req.params,
//             username: req.params.username
//         })
//     })

//     connection.end()
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))