function readCategoryUi(req, res) {
    res.render('pages/category/categoryList.ejs')
}

function addCategoryUi(req, res) {
    res.render('pages/category/categoryForm.ejs', { id : ''})
}

function editcategoryUi(req, res) {
    const id = req.params.id;

    res.render('pages/category/categoryForm.ejs', 
        { id: id}
    )
}



module.exports = (app) => {
    app.get('/category', readCategoryUi)
    app.get('/category/add', addCategoryUi)
    app.get('/category/:id', editcategoryUi)
}

