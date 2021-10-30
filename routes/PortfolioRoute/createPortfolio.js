const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { createPortfolio } = require('../../controllers/portfolio.controller');
const {
  validateCreatePortfolio,
} = require('../../middlewares/portfolioValidator');

/**
 * @swagger
 * /portfolio/:user_id:
 *   post:
 *     tags:
 *      - Portfolio
 *     summary: Create a portfolio
 *     description: Create a new portfolio for the logged in user
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *     requestBody:
 *       description: Portfolio payload
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Portfolio'
 *     responses:
 *      '200':
 *        description: Portfolio created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Portfolio'
 *      '403':
 *        description: The requesting user is unauthorized to update the requested user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '409':
 *        description: The portfolio already exists for user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      default:
 *        description: An unexpected error occured
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post(
  '/:user_id',
  auth,
  validateCreatePortfolio(),
  bodyValidator,
  createPortfolio,
);

module.exports = router;
