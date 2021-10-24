const router = require('express').Router();
const bodyValidator = require('../../util/body_validator');
const { validateUserLogin } = require('../../middlewares/auth');
const { login } = require('../../controllers/auth.controller');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Logs in a user
 *     description: Logs in a user if correct details are provided
 *     requestBody:
 *       description: Login details
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
 *
 *      '409':
 *        description: A user with provided email or phone_number already exists
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.use('/', validateUserLogin(), bodyValidator, login);

module.exports = router;
