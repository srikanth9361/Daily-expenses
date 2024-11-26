function readExpenseUi(req, res) {
    res.render('pages/expense/expenselist.ejs')
}

function addExpenseUi(req, res) {
    res.render('pages/expense/expenseform.ejs', { id : ''})
}

function editExpenseUi(req, res) {
    const id = req.params.id;

    res.render('pages/expense/expenseform.ejs', { id: id})
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

