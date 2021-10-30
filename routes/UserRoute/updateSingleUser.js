const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { updateSingleUser } = require('../../controllers/user.controller');
const { userUpdateValidation } = require('../../middlewares/userValidator');

/**
 * @swagger
 * /user/:user_id:
 *   put:
 *     tags:
 *      - User
 *     summary: Update a single user
 *     description: Updates and returns a single user using the user_id param
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *     requestBody:
 *       description: Update payload
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *      '200':
 *        description: Update successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '403':
 *        description: The requesting user is unauthorized to update the requested user
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
router.put(
  '/:user_id',
  auth,
  userUpdateValidation(),
  bodyValidator,
  updateSingleUser,
);

module.exports = router;
