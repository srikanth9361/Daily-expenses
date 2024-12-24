function readCategorys(req, res) {
    const mysqlClient = req.app.mysqlClient;
    try {
        mysqlClient.query(/*sql*/`SELECT  c.* FROM 
        category AS c WHERE c.deletedAt IS NULL`,
            (err, result) => {
                if (err) {
                    res.status(500).send(err.sqlMessage)
                    console.log(err.sqlMessage)
                } else {
                    res.status(200).send(result)
                }
            })
    } catch (error) {
        // console.log(error.message)
        res.status(500).send(error.message)

    }
}

function readCategory(req, res) {
    const mysqlClient = req.app.mysqlClient
    const id = req.params.id

    try {
        mysqlClient.query(/*sql*/`SELECT * FROM category WHERE id = ?`, [id], (err, result) => {
            if (err) {
                res.status(500).send(err.sqlMessage)
                console.log(err)
            } else {
                res.status(200).send(result[0])
            }
        })
    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

function insertCategory(req, res) {
    const mysqlClient = req.app.mysqlClient
    const {
        categoryName
    } = req.body

    const isValidInsert = validateInsertCategory(req.body)
    if (isValidInsert.length > 0) {
        return res.status(400).send(isValidInsert)
    }

    try {
        mysqlClient.query(/*sql*/`INSERT INTO category(categoryName) VALUES(?)`,
            [categoryName],
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err.sqlMessage)
                } else {
                    res.status(201).send('inserted')
                }
            })
    } catch (error) {
        res.status(500).send(error)
        // console.log(error)
    }
}

function updateCategory(req, res) {
    const mysqlClient = req.app.mysqlClient
    const id = req.params.id
    const {
        categoryName = null
    } = req.body

    const isValidUpdate = validateInsertCategory(req.body, true)
    if (isValidUpdate.length > 0) {
        return res.status(400).send(isValidUpdate)
    }

    var values = []
    var updates = []

    if (categoryName) {
        values.push(categoryName)
        updates.push('categoryName = ?')
    }
    values.push(id)
    try {
        mysqlClient.query(/*sql*/`UPDATE category SET ${updates} WHERE id = ?`,
            values,
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err.sqlMessage)
                } else {
                    res.status(200).send(result)
                }
            })
    } catch (error) {
        res.status(500).send(error)
        // console.log(error)
    }
}

function deleteCategory(req, res) {
    const mysqlClient = req.app.mysqlClient
    const id = req.params.id

    try {
        mysqlClient.query(/*sql*/`DELETE FROM category WHERE id = ?`, [id], (err, result) => {
            if (err) {
                res.status(500).send(err.sqlMessage)
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        res.status(500).send(error)
        // console.log(error)
    }
}

function validateInsertCategory (body , isUpdate = false) {
    const {
        categoryName
    } = body;

    const errors = [];

    if (categoryName !== undefined) {
        if (typeof categoryName !== 'string' || categoryName.trim().length <= 2) {
            errors.push('categoryName is invalid');
        }
    } else if (!isUpdate) {
        errors.push('categoryName is missing');
    }
    return  errors;
}



module.exports = (app) => {
    app.get('/api/category', readCategorys)
    app.get('/api/category/:id', readCategory)
    app.post('/api/category', insertCategory)
    app.put('/api/category/:id', updateCategory)
    app.delete('/api/category/:id', deleteCategory)
}
