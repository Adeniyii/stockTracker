const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { getSingleUser } = require('../../controllers/user.controller');
const { userIdValidation } = require('../../middlewares/userValidator');

/**
 * @swagger
 * /user/:user_id:
 *   get:
 *     tags:
 *      - User
 *     summary: Gets a single user
 *     description: Returns a single user, using the user_id param
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *     responses:
 *      '200':
 *        description: Fetch successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '403':
 *        description: The requesting user is unauthorized to view the requested user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '404':
 *        description: The requested user does not exist
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      default:
 *        description: An Unexpected error occured
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.get('/:user_id', auth, userIdValidation(), bodyValidator, getSingleUser);

module.exports = router;
