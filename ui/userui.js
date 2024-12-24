function readUsersUi(req, res) {
    res.render('pages/user/userlist.ejs')
}

function generateotp (req , res) {
    res.render ('pages/user/generateotp.ejs')
}

function signin (req , res) {
    res.render ('pages/user/signin.ejs')
}


function addUserUi(req, res) {
    res.render('pages/user/userform.ejs', { userId : ''})
}

function editUserUi(req, res) {
    const userId = req.params.userId;

    res.render('pages/user/userform.ejs', 
        { userId: userId}
    )
}



module.exports = (app) => {
    app.get('/user', readUsersUi)
    app.get('/user/add', addUserUi)
    app.get('/user/:userId', editUserUi)
    app.get('/resetpassword', generateotp)
    app.get('/signin', signin)
}


