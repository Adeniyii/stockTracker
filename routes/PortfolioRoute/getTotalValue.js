const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { getPortfolioValue } = require('../../controllers/portfolio.controller');
const {
  validateGetPortfolioValue,
} = require('../../middlewares/portfolioValidator');

/**
 * @swagger
 * /portfolio/:user_id/value:
 *   get:
 *     tags:
 *      - Portfolio
 *     summary: Get cummulative portfolio value
 *     description: Get total valuse of stocks held in a portfolio
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *     responses:
 *      '200':
 *        description: Portfolio value fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PortfolioValue'
 *      '403':
 *        description: The requesting user is unauthorized to fetch the requested portfolio value
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '400':
 *        description: The user has no portfolios
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '404':
 *        description: Portfolio value not found
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
router.get(
  '/:user_id/value',
  auth,
  validateGetPortfolioValue(),
  bodyValidator,
  getPortfolioValue,
);

module.exports = router;
