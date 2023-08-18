const { body } = require('express-validator');

exports.validateItem = [
  body('name', 'Invalid name')
    .trim()
    .notEmpty()
    .withMessage("Name can't be empty")
    .isLength({ max: 255 })
    .withMessage('Name must be less than 255 characters')
    .escape(),
];
