/* eslint-disable no-unused-vars */
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const successResponse = require('../util/successHandler');
const { findUserById } = require('../services/UserService');
const {
  findPortfolioByName,
  createPortfolioService,
} = require('../services/PortfolioService');

/**
 * Create a new trade portfolio
 * @param req
 * @param res
 * @param next
 */
const createPortfolio = async (req, res, next) => {
  const { name } = req.body;
  const { user_id } = req.params;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can buy stock for another user
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  // Check if portfolio name is taken by user
  const existingPortfolio = await findPortfolioByName({ name, user_id });
  if (existingPortfolio) {
    return next(new AppError('Portfolio already exists', 409));
  }

  const newPortfolio = await createPortfolioService(name, user_id);

  return successResponse(res, 200, newPortfolio);
};

/**
 * Purchase selected stock amount
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const purchaseStock = (req, res, next) => {
  successResponse(res, 200);
};

/**
 * Sell selected amount of owned stock
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const sellStock = (req, res, next) => {
  successResponse(res, 200);
};

/**
 * Get total value of portfolio
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const getPortfolioValue = (req, res, next) => {
  successResponse(res, 200);
};

/**
 * Get details of stock within a portfolio
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const getPortfolioPositions = (req, res, next) => {
  successResponse(res, 200);
};

module.exports = {
  sellStock: catchAsync(sellStock),
  purchaseStock: catchAsync(purchaseStock),
  getPortfolioValue: catchAsync(getPortfolioValue),
  getPortfolioPositions: catchAsync(getPortfolioPositions),
};
