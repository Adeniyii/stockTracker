const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { purchaseStock } = require('../../controllers/portfolio.controller');
const { validateBuyStock } = require('../../middlewares/tradeValidator');

/**
 * @swagger
 * /trade/:user_id/:
 *   post:
 *     tags:
 *      - Trade
 *     summary: Purchase a stock
 *     description: Purchase a stock for the specified portfolio
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *      - $ref: '#/components/parameters/portfolio_id'
 *     responses:
 *      '200':
 *        description: Stock purchased successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Stock'
 *      '400':
 *        description: The portfolio does not have sufficient funds
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
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
router.post(
  '/:user_id',
  auth,
  validateBuyStock(),
  bodyValidator,
  purchaseStock,
);

module.exports = router;
