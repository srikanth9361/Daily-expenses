function loginPageUi (req, res) {
    res.render('pages/login.ejs')
}

function homePageUi (req, res) {
    if (req.session.isLogged === true) {
        res.render('pages/home.ejs')
    } else {
        res.redirect('http://localhost:1000/login')
    }
}



module.exports = (app) => {
    app.get('/login', loginPageUi)
    app.get('/home', homePageUi)
}