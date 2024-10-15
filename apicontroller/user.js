function readUsers(req, res) {
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query(/*sql*/`SELECT u.*,
        DATE_FORMAT(u.createdAt, "%Y-%m-%d") AS createdAt,
        DATE_FORMAT(u.updatedAt, "%Y-%m-%d") AS updatedAt
         FROM user AS u WHERE u.deletedAt IS NULL`, (err, result) => {
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

function readUser(req, res) {
    const mysqlClient = req.app.mysqlClient
    const userId = req.params.id
    try {
        mysqlClient.query(/*sql*/`SELECT * FROM user WHERE userId = ?`, [userId], (err, result) => {
            if (err) {
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

function insertUser(req, res) {
    const mysqlClient = req.app.mysqlClient
    const {
        fullName, gender, userName, password, email
    } = req.body

    const isValidInsert = validateInsertItem(req.body)
    if (isValidInsert.length > 0) {
        return res.status(400).send(isValidInsert)
    }

    try {
        mysqlClient.query(/*sql*/`INSERT INTO user(fullName, gender, userName, password, email) VALUES(?,?,?,?,?)`,
            [fullName, gender, userName, password, email],
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

// function validateUpdateItem(body) {
//     const {
//         fullName, gender, userName, password, email
//     } = body

//     const errors = []

//     if (fullName === undefined) {
//         errors.push('fullName is missing');
//     } else if (typeof fullName !== 'string' || fullName.trim().length < 2) {
//         errors.push('fullName must be at least 2 characters');
//     }

//     if (gender === undefined) {
//         errors.push('gender is missing');
//     } else if (!['male', 'female',].includes(gender)) {
//         errors.push('Gender must be either "male", "female"');
//     }

//     if (userName === undefined) {
//         errors.push('userName is missing');
//     } else if (typeof userName !== 'string' || userName.trim().length < 6) {
//         errors.push('userName must be at least 6 characters');
//     }

//     if (password === undefined) {
//         errors.push('Password is missing');
//     } else if (typeof password !== 'string' || password.length < 8) {
//         errors.push('Password must be at least 8 characters ');
//     }

//     if (email === undefined) {
//         errors.push('Email is missing');
//     } else {
//         const isValidEmail = (email) => {
//             const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             return regex.test(email);
//         };

//         if (!isValidEmail(email)) {
//             errors.push('Please enter a valid email address');
//         }
//     }

//     return errors

// }


function updateUser(req, res) {
    const mysqlClient = req.app.mysqlClient
    const userId = req.params.id
    const {
        fullName = null,
        gender = null,
        userName = null,
        password = null,
        email = null
    } = req.body

    const isValidUpdate = validateInsertItem(req.body)
    if (isValidUpdate.length > 0) {
        return res.status(400).send(isValidUpdate)
    }

    var values = []
    var updates = []

    if (fullName) {
        values.push(fullName)
        updates.push('fullName = ?')
    }

    if (gender) {
        values.push(gender)
        updates.push('gender = ?')
    }

    if (userName) {
        values.push(userName)
        updates.push('userName = ?')
    }

    if (password) {
        values.push(password)
        updates.push('password = ?')
    }

    if (email) {
        values.push(email)
        updates.push('email = ?')
    }

    values.push(userId)

    try {
        mysqlClient.query(/*sql*/`UPDATE user SET ${updates} WHERE userId = ?`,
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

function deleteUser(req, res) {
    const mysqlClient = req.app.mysqlClient
    const userId = req.params.id

    try {
        mysqlClient.query(/*sql*/`DELETE FROM user WHERE userId = ?`, [userId], (err, result) => {
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

function validateInsertItem(body) {
    const {
        fullName, gender, userName, password, email
    } = body
    const errors = []

    if (fullName !== undefined) {
        if (typeof fullName !== 'string' || fullName.trim().length <= 2) {
            errors.push('fullName is invalid');
        }
    } else {
        errors.push('fullName is missing');
    }

    if (gender !== undefined) {
        if (!['male', 'female',].includes(gender)) {
            errors.push('gender must be either "male", "female"');
        }
    } else {
        errors.push('gender is missing');
    }

    if (userName !== undefined) {
        if (typeof userName !== 'string' || userName.trim().length < 6) {
            errors.push('userName must be at least six characters');
        }
    } else {
        errors.push('userName is missing');
    }

    if (password !== undefined) {
        if (typeof password !== 'string' || password.trim().length < 8) {
            errors.push('Password must be at least 8 characters ');
        }
    } else {
        errors.push('password is missing');
    }

    if (email !== undefined) {
        if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Invalid email format');
        }
    } else {
        errors.push('email is missing');
    }

    return errors
}

// function generateDateReport(req, res) {
//     const mysqlClient = req.app.mysqlClient;
//     const { startDate, endDate } = req.query;
//     try {
//          mysqlClient.query(/*sql*/`SELECT * FROM user WHERE DATE >= ? AND DATE <= ?`,
//             [startDate, endDate], (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).send(err.sqlMessage);
//                 }
//                 res.status(200).send(result);
//             })
//   } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// }

module.exports = (app) => {
    app.get('/api/user', readUsers)
    app.get('/api/user/:id', readUser)
    // app.get('/api/user/report', generateDateReport)
    app.post('/api/user', insertUser)
    app.put('/api/user/:id', updateUser)
    app.delete('/api/user/:id', deleteUser)
}
