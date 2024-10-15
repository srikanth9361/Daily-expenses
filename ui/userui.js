function readUsersUi(req, res) {
    res.render('pages/user/userlist.ejs')
}

module.exports = (app) => {
    app.get('/user', readUsersUi)
}


