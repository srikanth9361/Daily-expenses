const express = require('express')
const mysql = require('mysql2')
// const logger = require('pino')()
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
// const pinoReqLogger = require ('pino-http')()

var FileStore = require('session-file-store')(session);
var fileStoreOption = {};

const app = express()
app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser())
// app.use(pinoReqLogger)
app.use(session({
    strore: new FileStore(fileStoreOption),
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: (1000 * 60 * 15)
    }
}))


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/uicontroller/views'))
app.use(express.static(path.join(__dirname, 'public')))

app.mysqlClient = mysql.createConnection({
    host: 'localhost', //127.0.0.1
    user: 'root',
    password: 'root',
    database: 'dailyexpenses'
})
app.use((req, res, next) => {
    if (req.originalUrl === '/api/login' || req.originalUrl === '/resetpassword') {
        return next()
    }

    if (req.originalUrl !== '/login') {
        if (req.session.isLogged !== true) {
            return res.status(401).redirect('http://localhost:1000/login')
        }
    } else {
        if (req.session.isLogged === true) {
            return res.status(200).redirect('http://localhost:1000/home')
        }
    }
    return next()
})
//apicontroller
const user = require('./apicontroller/user.js')
const category = require('./apicontroller/category.js')
const expense = require('./apicontroller/expense.js')


//uicontroller
const userUi = require('./ui/userui.js')
const homeUi = require('./ui/homeui.js')
const categoryUi = require('./ui/categoryui.js')


app.mysqlClient.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('mysql connected')

        user(app)
        category(app)
        expense(app)

        homeUi(app)
        userUi(app)
        categoryUi(app)


        app.listen(1000, () => {
            console.log('listen 1000port')
            // logger.info('listen 1000port')

        })

    }
})


