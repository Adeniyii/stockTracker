const router = require('express').Router();
const auth = require('../../auth/auth');
const { verifyActivationCode } = require('../../controllers/user.controller');
const { verifyOtpValidation } = require('../../middlewares/userValidator');
const bodyValidator = require('../../middlewares/validationHandler');

/**
 * @swagger
 * /user/:user_id/verify:
 *   put:
 *     tags:
 *      - User
 *     summary: Verify a user
 *     description: Verifies the OTP provided by the user
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *      - $ref: '#/components/parameters/otp'
 *     responses:
 *      '200':
 *        description: Update successful
 *      '403':
 *        description: The requesting user is unauthorized to verify the requested user
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
 *      '400':
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
router.post(
  '/:user_id/verify',
  auth,
  verifyOtpValidation(),
  bodyValidator,
  verifyActivationCode,
);

module.exports = router;
