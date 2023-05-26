import { body } from 'express-validator'

export const validateUserInput = [
  body('first_name')
    .notEmpty().withMessage('This field is required.')
    .isLength({ min: 5 }).withMessage('Must contain at least 5 characters.'),

  body('last_name')
    .notEmpty().withMessage('This field is required.')
    .isLength({ min: 5 }).withMessage('Must contain at least 5 characters.'),

  body('email').isEmail(),

  body('gender')
    .custom((value) => (value === 'Male' || value === 'Female'))
    .withMessage("Gender must be 'Male' or 'Female'"),

  body('age')
    .isInt({ min: 18, max: 99 })
    .withMessage('Must be in the range of 18 - 99 years')
]
