function readExpenseUi(req, res) {
    const userId = req.session.data.userId
    res.render('pages/expense/expenselist.ejs', {
        userId: userId
    })
}

function addExpenseUi(req, res) {
    res.render('pages/expense/expenseform.ejs', { id : ''})
}

function editExpenseUi(req, res) {
    const id = req.params.id;
    console.log(id)
    res.render('pages/expense/expenseform.ejs', {id})
}

function readExpenseReportUi(req , res) {
    res.render('pages/expense/expenseReport.ejs')
}


module.exports = (app) => {
    app.get('/expense', readExpenseUi)
    app.get('/expense/add', addExpenseUi)
    app.get('/expense/:id', editExpenseUi)
    app.get('/report', readExpenseReportUi)
}

