const router = require('express').Router();
const auth = require('../../auth/auth');
const { activateUser } = require('../../controllers/user.controller');
const { userActivationValidation } = require('../../middlewares/userValidator');
const bodyValidator = require('../../middlewares/validationHandler');

/**
 * @swagger
 * /user/:user_id/activate:
 *   put:
 *     tags:
 *      - User
 *     summary: Activate a user
 *     description: Sends an OTP to the users email, to be used for activation
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *     requestBody:
 *       description: Update payload
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/ActivateOTP'
 *     responses:
 *      '204':
 *        description: OTP sent successfully
 *      '403':
 *        description: The requesting user is unauthorized to activate the requested user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '404':
 *        description: The user does not exist
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '405':
 *        description: User has not enabled 2FA protection
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
  '/:user_id/activate',
  auth,
  userActivationValidation(),
  bodyValidator,
  activateUser,
);

module.exports = router;
