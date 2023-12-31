const { body } = require('express-validator');

exports.validateItem = [
  body('name', 'Invalid name')
    .trim()
    .notEmpty()
    .withMessage("Name can't be empty")
    .isLength({ max: 255 })
    .withMessage('Name must be less than 255 characters')
    .escape(),
  body('description', 'Invalid description')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters')
    .escape(),
  body('price', 'Invalid price')
    .trim()
    .isDecimal({ decimal_digits: 2, force_decimal: false })
    .withMessage('Price must be a number with only 2 decimals'),
  body('stock', 'Invalid stock')
    .trim()
    .isInt({ min: 0 })
    .withMessage('Stock must be an integer and 0 or greater'),
  body('image-url')
    .optional({
      values: 'falsy',
    })
    .trim()
    .isURL()
    .withMessage('Invalid URL'),
];

exports.validateCategory = [
  body('name', 'Invalid name')
    .trim()
    .notEmpty()
    .withMessage("Name can't be empty")
    .isLength({ max: 255 })
    .withMessage('Name must be less than 255 characters')
    .escape(),
  body('description', 'Invalid description')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters')
    .escape(),
  body('image-url')
    .optional({
      values: 'falsy',
    })
    .trim()
    .isURL()
    .withMessage('Invalid URL'),
];
