const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const {
  getPortfolioPositions,
} = require('../../controllers/portfolio.controller');
const {
  validatePortfolioPositions,
} = require('../../middlewares/tradeValidator');

/**
 * @swagger
 * /trade/:user_id/:
 *   get:
 *     tags:
 *      - Trade
 *     summary: Get a users portfolio positions
 *     description: Get all trades for a single portfolio
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *      - $ref: '#/components/parameters/portfolio_id'
 *     responses:
 *      '200':
 *        description: Portfolio positions fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PortfolioPositions'
 *      '403':
 *        description: The requesting user is unauthorized to update the requested user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      '404':
 *        description: Portfolio not found
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
  '/:user_id',
  auth,
  validatePortfolioPositions(),
  bodyValidator,
  getPortfolioPositions,
);

module.exports = router;
