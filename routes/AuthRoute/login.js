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
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: The user provided invalid login details
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
router.use('/', validateUserLogin(), bodyValidator, login);

module.exports = router;
