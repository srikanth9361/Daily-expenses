function readExpenses(req, res) {
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query(/*sql*/`SELECT 
            e.*, 
            u.userName,
            c.categoryName,
            DATE_FORMAT(e.createdAt, "%y-%m-%d") AS createdAt,
            DATE_FORMAT(e.updatedAt, "%y-%m-%d") AS updatedAt,
            DATE_FORMAT(e.expenseDate, "%y-%M-%d") AS expenseDate
        FROM 
            expense AS e
        LEFT JOIN 
            user AS u ON u.userId = e.userId
        LEFT JOIN 
            category AS c ON c.id = e.categoryId
        WHERE
            e.deletedAt IS NULL`, (err, result) => {
            if (err) {
                return res.status(500).send(err.sqlMessage)
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        res.status(500).send(error)
        // console.log(error)
    }
}

function readExpense(req, res) {
    const mysqlClient = req.app.mysqlClient
    const id = req.params.id

    try {
        mysqlClient.query(/*sql*/`SELECT e.*, 
            u.userName,
            c.categoryName,
            DATE_FORMAT(e.expenseDate, "%y-%M-%d") AS expenseDate

            
        FROM expense AS e
        LEFT JOIN 
            user AS u ON u.userId = e.userId
        LEFT JOIN 
            category AS c ON c.id = e.categoryId
         WHERE u.userId = ?  AND e.deletedAt IS NULL`, [id], (err, result) => {
            if (err) {
                res.status(500).send(err.sqlMessage)
                console.log(err)
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
                 console.log(error)

        res.status(500).send(error)
    }
}


function insertExpense(req, res) {
    const mysqlClient = req.app.mysqlClient
    const {
        userId, categoryId, amount, description, expenseDate, paymentMethod
    } = req.body


    const isValidInsert = validateInsertItem(req.body)
    if (isValidInsert.length > 0) {
        return res.status(400).send(isValidInsert)
    }

    try {
        mysqlClient.query(/*sql*/`INSERT INTO expense(userId, categoryId, amount, description, expenseDate, paymentMethod) VALUES(?,?,?,?,?,?)`,
            [userId, categoryId, amount, description, expenseDate, paymentMethod],
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

function updateExpense(req, res) {
    const mysqlClient = req.app.mysqlClient
    const id = req.params.id
    const {
        userId = null,
        categoryId = null,
        amount = null,
        description = null,
        expenseDate = null,
        paymentMethod = null
    } = req.body

    const isValidUpdate = validateInsertItem(req.body, true)
    if (isValidUpdate.length > 0) {
        return res.status(400).send(isValidUpdate)
    }

    var values = []
    var updates = []

    if (userId) {
        values.push(userId)
        updates.push('userId = ?')
    }
    if (categoryId) {
        values.push(categoryId)
        updates.push('categoryId = ?')
    }
    if (amount) {
        values.push(amount)
        updates.push('amount = ?')
    }
    if (description) {
        values.push(description)
        updates.push('description = ?')
    }
    if (expenseDate) {
        values.push(expenseDate)
        updates.push('expenseDate = ?')
    }
    if (paymentMethod) {
        values.push(paymentMethod)
        updates.push('paymentMethod = ?')
    }

    values.push(id)
    try {
        mysqlClient.query(/*sql*/`UPDATE expense SET ${updates} WHERE id = ?`,
            values,
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err.sqlMessage)
                } else {
                    res.status(201).send(result)
                }
            })
    } catch (error) {
        res.status(500).send(error)
        // console.log(error)
    }
}

function deleteExpense(req, res) {
    const mysqlClient = req.app.mysqlClient
    const id = req.params.id

    try {
        mysqlClient.query(/*sql*/`DELETE FROM expense WHERE id = ?`, [id], (err, result) => {
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


function validateInsertItem(body, isUpdate = false) {
    const {
        userId, categoryId, amount, description, expenseDate, paymentMethod
    } = body
    const errors = []
    console.log(categoryId)

    if (userId !== undefined) {
        if (userId <= 0) {
            errors.push('userId must be a number');
        }
    } else if (!isUpdate) {
        errors.push('userId is missing');
    }

    if (categoryId !== undefined) {
        if (categoryId <= 0) {
            errors.push('categoryId must be a number');
        }
    } else if (!isUpdate) {
        errors.push('categoryId is missing');
    }

    if (amount !== undefined) {
        if (amount <= 0) {
            errors.push('amount must be a number');
        }
    } else if (!isUpdate) {
        errors.push('amount is missing');
    }

    if (description !== undefined) {
        if (typeof description !== 'string' || description.trim().length < 3) {
            errors.push('description must be a string with at least 3 characters');
        }
    } else if (!isUpdate) {
        errors.push('description is missing');
    }

    if (expenseDate !== undefined) {
        const date = new Date(expenseDate);
        if (isNaN(date.getTime())) {
            errors.push('expenseDate must be a valid date');
        }
    } else if (!isUpdate) {
        errors.push('expenseDate is missing')
    }

    if (paymentMethod !== undefined) {
        if (typeof paymentMethod !== 'string' || paymentMethod.trim().length < 2) {
            errors.push('paymentMethod must be a string with at least 2 characters');
        }
    } else if (!isUpdate) {
        errors.push('paymentMethod is missing')
    }
    console.log(errors)

    return errors
}

// function generateExpenseReport(req, res) {
//     const mysqlClient = req.app.mysqlClient
//     const { userId, startDate, endDate } = req.query
    
//     try {
//         const query = /*sql*/`
//             SELECT 
//                 e.*,
//                 e.userId, 
//                 u.userName,
//                 c.categoryName,
//                 e.amount,
//                 DATE_FORMAT(e.createdAt, "%y-%m-%d") AS createdAt,
//                 DATE_FORMAT(e.updatedAt, "%y-%m-%d") AS updatedAt,
//                 DATE_FORMAT(e.expenseDate, "%y-%m-%d") AS expenseDate
//             FROM 
//                 expense AS e
//             LEFT JOIN 
//                 user AS u ON u.userId = e.userId
//             LEFT JOIN 
//                 category AS c ON c.id = e.categoryId
//             WHERE
//                 e.userId = ? 
//                 AND e.expenseDate BETWEEN ? AND ? 
//                 AND e.deletedAt IS NULL
//             ORDER BY e.expenseDate ASC
//         `

//         mysqlClient.query(query, [userId, startDate, endDate], (err, result) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).send(err.sqlMessage)
//             } else {
//                 console.log(result)
//                 return res.status(200).send(result)
//             }
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error)
//     }
// }

function generateExpenseReport(req, res) {
    const mysqlClient = req.app.mysqlClient;
    const { userId, startDate, endDate } = req.query;
    
    try {
        let query = /*sql*/ `
            SELECT 
                e.*,
                e.userId, 
                u.userName,
                c.categoryName,
                e.amount,
                DATE_FORMAT(e.createdAt, "%y-%m-%d") AS createdAt,
                DATE_FORMAT(e.updatedAt, "%y-%m-%d") AS updatedAt,
                DATE_FORMAT(e.expenseDate, "%y-%m-%d") AS expenseDate
            FROM 
                expense AS e
            LEFT JOIN 
                user AS u ON u.userId = e.userId
            LEFT JOIN 
                category AS c ON c.id = e.categoryId
            WHERE
                e.deletedAt IS NULL
        `;
        
        const queryParams = [];
        
        if (userId) {
            query += " AND e.userId = ?";
            queryParams.push(userId);
        }
        if (startDate && endDate) {
            query += " AND e.expenseDate BETWEEN ? AND ?";
            queryParams.push(startDate, endDate);
        }

        query += " ORDER BY e.expenseDate ASC";

        mysqlClient.query(query, queryParams, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err.sqlMessage);
            } else {
                console.log(result);
                return res.status(200).send(result);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = (app) => {
    app.get('/api/expense', readExpenses)
    app.get('/api/expense/report', generateExpenseReport)
    app.get('/api/expense/:id', readExpense)
    app.post('/api/expense', insertExpense)
    app.put('/api/expense/:id', updateExpense)
    app.delete('/api/expense/:id', deleteExpense)
}
