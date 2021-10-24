const router = require('express').Router();
const { signUp } = require('../../controllers/auth.controller');
const bodyValidator = require('../../middlewares/validationHandler');
const { validateUserSignUp } = require('../../middlewares/authValidator');

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Creates a user account
 *     description: Creates a user account using info from body
 *     requestBody:
 *       description: Registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/RegisterInfo'
 *     responses:
 *      '201':
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: The user provided invalid registration details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '409':
 *        description: A user with provided email or phone_number already exists
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      default:
 *        description: An error occured
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/signup', validateUserSignUp(), bodyValidator, signUp);

module.exports = router;
