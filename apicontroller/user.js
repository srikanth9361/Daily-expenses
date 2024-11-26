const e = require('express');
const { Result } = require('express-validator');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const OTP_LIMIT = 6;
const OTP_OPTION = {
    digits: true,
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    specialChars: false
};


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
                res.status(200).send(result[0])
            }
        })
    } catch (error) {
        res.status(500).send(error)
        // console.log(error)
    }
}

function readUserIdAndUserName(req, res) {
    const mysqlClient = req.app.mysqlClient

    try {
            mysqlClient.query(/*sql*/`SELECT userId, userName FROM user WHERE deletedAt IS NULL`,
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

function authentication(req, res) {
    const mysqlClient = req.app.mysqlClient
    const {
        userName,
        password
    } = req.body

    try {
        mysqlClient.query(/*sql*/`SELECT * FROM user WHERE userName = ? AND password = ?`,
            [userName, password], (err, result) => {

                if (err || result.length === 0) {
                    req.session.isLogged = false
                    req.session.data = null
                    res.status(409).send('Invalid userName or password')
                } else {
                    req.session.isLogged = true
                    req.session.data = result[0]
                    res.status(200).send('success')
                }
            })
    } catch (error) {
        res.status(500).send(error)
    }
}

function logOut(req, res) {
    req.session.destroy((err) => {
        if (err) console.log(err)
        // logger.error()
        res.redirect('http://localhost:1000/login')
    })
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

function generateOtp(req, res) {
    const mysqlClient = req.app.mysqlClient;
    const { email } = req.body;

    try {
        mysqlClient.query(/*sql*/`SELECT COUNT(*) AS count FROM user WHERE email = ? AND deletedAt IS NULL`,
            [email], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err.sqlMessage);
                }
                if (result.length === 0) {
                    return res.status(404).send({ message: 'No active user found with this email.' });
                }


                var otpCode = otpGenerator.generate(OTP_LIMIT, OTP_OPTION);

                mysqlClient.query(/*sql*/`UPDATE user SET otp = ? WHERE email = ? AND deletedAt IS NULL`,
                    [otpCode, email], (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err.sqlMessage);
                        }

                        res.status(200).send({ message: 'OTP generated successfully' });
                    });

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'srikanthmessii07@gmail.com',
                        pass: 'qbse hqaj fnok bowi'
                    }
                });

                var mailOptions = {
                    from: 'srikanthmessii07@gmail.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    html: `${otpCode}`

                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

            })
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

// function processResetPassword(req, res) {
//     const mysqlClient = req.app.mysqlClient;
//     const { email, otp, newPassword } = req.body;
//     const otpAttemptMax = 3;
//     console.log(email)

//     try {
//         mysqlClient.query(/*sql*/`SELECT otp, otpAttempt FROM user WHERE email = ? AND deletedAt IS NULL`,
//             [email], (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).send(err.sqlMessage);
//                 }

//                 if (result.length === 0) {
//                     return res.status(404).send({ message: 'No active user found with this email.' });
//                 }

//                 const user = result[0];
//                 const userOtp = user.otp;
//                 const userOtpAttempt = user.otpAttempt;


//                 if (userOtpAttempt >= otpAttemptMax) {
//                     console.log(userOtpAttempt)
//                     mysqlClient.query(/*sql*/`UPDATE user SET otp = NULL, otpAttempt = 0 WHERE email = ? AND deletedAt IS NULL`,
//                         [email], (err, result) => {
//                             if (err) {
//                                 console.error(err);
//                                 return res.status(500).send(err.sqlMessage);
//                             }

//                             return res.status(403).send({ message: 'Maximum OTP attempts reached. Please try again later.' })

//                         });
//                     return
//                 }

//                 if (userOtp !== otp) {
//                     mysqlClient.query(/*sql*/`UPDATE user SET otpAttempt = otpAttempt + 1 WHERE email = ? AND deletedAt IS NULL`,
//                         [email], (err, result) => {
//                             if (err) {
//                                 console.error(err);
//                                 return res.status(500).send(err.sqlMessage);
//                             }
//                         });

//                     return res.status(400).send({ message: 'Invalid OTP. Please try again.' });
//                 }


//                 mysqlClient.query(/*sql*/`UPDATE user SET password = ?, otp = NULL, otpAttempt = 0 WHERE email = ? AND deletedAt IS NULL`,
//                     [newPassword, email], (err, result) => {
//                         if (err) {
//                             console.error(err);
//                             return res.status(500).send(err.sqlMessage);
//                         }
//                         res.status(200).send({ message: 'Password reset successfully.' });
//                     });
//             });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// }
function processResetPassword(req, res) {
    const mysqlClient = req.app.mysqlClient;
    const { email, otp, newPassword } = req.body;
    const otpAttemptMax = 3;
    const otpCooldown = 30 * 60 * 1000;

    console.log(email);

    try {
        mysqlClient.query(/*sql*/`SELECT otp, otpAttempt, otpTime FROM user WHERE email = ? AND deletedAt IS NULL`,
            [email], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err.sqlMessage);
                }

                if (result.length === 0) {
                    return res.status(404).send({ message: 'No active user found with this email.' });
                }

                const user = result[0];
                const userOtp = user.otp;
                const userOtpAttempt = user.otpAttempt;
                const userOtpTime = user.otpTime ? new Date(user.otpTime) : null;
                const currentTime = new Date();

                if (userOtpAttempt >= otpAttemptMax) {
                    if (userOtpTime && currentTime - userOtpTime < otpCooldown) {
                        const remainingTime = otpCooldown - (currentTime - userOtpTime);
                        const minutesLeft = Math.ceil(remainingTime / (1000 * 60)); 
                        return res.status(403).send({ message: `Maximum OTP attempts reached. Please try again in ${minutesLeft} minute(s).` });
                    }

                    mysqlClient.query(/*sql*/`UPDATE user SET otp = NULL, otpAttempt = 0, otpTime = NULL WHERE email = ? AND deletedAt IS NULL`,
                        [email], (err, result) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).send(err.sqlMessage);
                            }

                            return res.status(403).send({ message: 'Maximum OTP attempts reached. You can try again now.' });
                        });
                    return;
                }

                if (userOtp !== otp) {
                    mysqlClient.query(/*sql*/`UPDATE user SET otpAttempt = otpAttempt + 1 WHERE email = ? AND deletedAt IS NULL`,
                        [email], (err, result) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).send(err.sqlMessage);
                            }
                        });

                    if (userOtpAttempt + 1 >= otpAttemptMax) {
                        mysqlClient.query(/*sql*/`UPDATE user SET otpTime = CURRENT_TIMESTAMP WHERE email = ? AND deletedAt IS NULL`,
                            [email], (err, result) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).send(err.sqlMessage);
                                }
                            });
                    }

                    return res.status(400).send({ message: 'Invalid OTP. Please try again.' });
                }

                mysqlClient.query(/*sql*/`UPDATE user SET password = ?, otp = NULL, otpAttempt = 0, otpTime = NULL WHERE email = ? AND deletedAt IS NULL`,
                    [newPassword, email], (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err.sqlMessage);
                        }
                        res.status(200).send({ message: 'Password reset successfully.' });
                    });
            });

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}



module.exports = (app) => {
    app.get('/api/user/idandusername', readUserIdAndUserName)

    app.put('/api/user/resetpassword', processResetPassword)
    app.get('/api/user', readUsers)
    app.get('/api/user/:id', readUser)
    app.post('/api/login', authentication)
    app.post('/api/user', insertUser)
    app.get('/api/logout', logOut)
    app.put('/api/user/:id', updateUser)
    app.delete('/api/user/:id', deleteUser)
    app.post('/api/user/generateotp', generateOtp)


}
