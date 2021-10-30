const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const {
  getSinglePortfolio,
  getAllPortfolio,
} = require('../../controllers/portfolio.controller');
const {
  validateGetPortfolio,
  validateGetAllPortfolio,
} = require('../../middlewares/portfolioValidator');

/**
 * @swagger
 * /portfolio/:user_id/all:
 *   get:
 *     tags:
 *      - Portfolio
 *     summary: Get all user's portfolio
 *     description: Get all stock portfolios of the logged in user
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *     responses:
 *      '200':
 *        description: Portfolios fetched successfully
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
 *      '404':
 *        description: The user has no portfolios
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
  '/:user_id/all',
  auth,
  validateGetAllPortfolio(),
  bodyValidator,
  getAllPortfolio,
);

/**
 * @swagger
 * /portfolio/:user_id:
 *   get:
 *     tags:
 *      - Portfolio
 *     summary: Get a single portfolio
 *     description: Get a single stock portfolio of the logged in user
 *     parameters:
 *      - $ref: '#/components/parameters/user_id'
 *     responses:
 *      '200':
 *        description: Portfolios fetched successfully
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
 *      '404':
 *        description: The user has no portfolios
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
  validateGetPortfolio(),
  bodyValidator,
  getSinglePortfolio,
);

module.exports = router;
