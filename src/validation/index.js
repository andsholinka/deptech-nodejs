const {
    body,
    validationResult,
    check
} = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Bad Request",
            message: errors.array()[0].msg
        });
    }
    next()
}

exports.createAdmin = [
    check('first_name', 'first_name cannot be null').notEmpty(),
    check('last_name', 'last_name cannot be null').notEmpty(),
    check('email', 'email cannot be null')
    .notEmpty()
    .isEmail(),
    check('birth_date', 'birth_date cannot be null').notEmpty(),
    check('gender', 'gender cannot be null').notEmpty(),
    check('password', 'password cannot be null').notEmpty(),
]

exports.createCategory = [
    check('name', 'name cannot be null').notEmpty(),
    check('desc', 'desc cannot be null').notEmpty(),
]