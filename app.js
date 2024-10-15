const express = require('express')
const mysql = require('mysql2')
const logger = require('morgan')
const path = require('path')

const app = express()
app.use(express.json())
app.use(logger('dev'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/uicontroller/views'))
app.use(express.static(path.join(__dirname, 'public')))

app.mysqlClient = mysql.createConnection({
    host: 'localhost', //127.0.0.1
    user: 'root',
    password: 'root',
    database: 'dailyexpenses'
})
//apicontroller
const user = require('./apicontroller/user.js')
const category = require('./apicontroller/category.js')
const expense = require('./apicontroller/expense.js')

//uicontroller
const userUi = require('./ui/userui.js')

app.mysqlClient.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('mysql connected')

        user(app)
        category(app)
        expense(app)

        userUi(app)


        app.listen(1000, () => {
            console.log('listen 1000port')
        })

    }
})


