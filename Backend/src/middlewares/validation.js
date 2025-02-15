const { body, query, param, validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    };
};

// User validation rules
const userValidation = {
    register: [
        body('email').isEmail().normalizeEmail(),
        body('username').trim().isLength({ min: 3, max: 30 }),
        body('password').isLength({ min: 6 })
    ],
    update: [
        body('email').optional().isEmail().normalizeEmail(),
        body('username').optional().trim().isLength({ min: 3, max: 30 }),
        body('bio').optional().trim().isLength({ max: 500 })
    ]
};

// Project validation rules
const projectValidation = {
    create: [
        body('title').trim().isLength({ min: 3, max: 100 }),
        body('description').trim().isLength({ min: 10 }),
        body('techStack').isArray(),
        body('visibility').isIn(['public', 'private'])
    ],
    update: [
        body('title').optional().trim().isLength({ min: 3, max: 100 }),
        body('description').optional().trim().isLength({ min: 10 }),
        body('techStack').optional().isArray(),
        body('visibility').optional().isIn(['public', 'private'])
    ]
};

// Comment validation rules
const commentValidation = {
    create: [
        body('content').trim().isLength({ min: 1, max: 1000 })
    ],
    update: [
        body('content').trim().isLength({ min: 1, max: 1000 })
    ]
};

module.exports = {
    validate,
    userValidation,
    projectValidation,
    commentValidation
};