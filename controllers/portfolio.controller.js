/* eslint-disable no-unused-vars */
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const successResponse = require('../util/successHandler');
const { findUserById } = require('../services/UserService');
const {
  getTotalCash,
  getCurrentPrice,
  updatePortfolio,
  findPortfolioById,
  findPortfolioByFilter,
  createPortfolioService,
} = require('../services/PortfolioService');
const { findTradeBySymbol } = require('../services/TradeService/findTrade');
const { createTradeService } = require('../services/TradeService/create');
const { updateTradeService } = require('../services/TradeService');

/**
 * Create a new trade portfolio
 * @param req
 * @param res
 * @param next
 */
const createPortfolio = async (req, res, next) => {
  const { name, user_id } = req.body;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can buy stock for another user
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  // Check if portfolio name is taken by user
  const existingPortfolio = await findPortfolioByFilter({ name, user_id });
  if (existingPortfolio) {
    return next(new AppError('Portfolio already exists', 409));
  }

  const newPortfolio = await createPortfolioService(name, user_id);

  return successResponse(res, 200, { portfolio: newPortfolio });
};

/**
 * Get a single portfolio
 * @param req
 * @param res
 * @param next
 */
const getPortfolio = async (req, res, next) => {
  const { portfolio_id, user_id } = req.body;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can query for another user's portfolio
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  const foundPortfolio = await findPortfolioByFilter({
    user_id,
    _id: portfolio_id,
  });

  if (!foundPortfolio) {
    return next(new AppError('Portfolio not found', 404));
  }

  return successResponse(res, 200, { portfolio: foundPortfolio });
};

/**
 * Purchase selected stock amount
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const purchaseStock = async (req, res, next) => {
  const { symbol, shares, portfolio_id } = req.body;
  const { user_id } = req.param;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can buy stock for another user
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  // Check if portfolio exists
  const requestingPortfolio = await findPortfolioById(portfolio_id);
  if (!requestingPortfolio) {
    return next(new AppError('Portfolio not found', 404));
  }

  // Get realtime stock price
  const stockPrice = await getCurrentPrice(symbol);
  // Get cash left in portfolio
  const availableCash = await getTotalCash(user_id, portfolio_id);

  if (availableCash < stockPrice * shares) {
    return next(new AppError('Insufficient funds', 404));
  }

  // create update DTO
  const updateObj = {
    cash: availableCash - stockPrice * shares,
  };

  // update portfolio cash
  const updatedPortfolio = await updatePortfolio(
    portfolio_id,
    user_id,
    updateObj,
  );

  // check if stock exists in portfolio
  const existingStock = await findTradeBySymbol(symbol, portfolio_id);

  let payload = {};
  let response = {};
  if (!existingStock) {
    payload = {
      symbol,
      shares,
      portfolio_id,
      purchase_price: stockPrice,
    };
    response = await createTradeService(payload);
  } else {
    payload = { shares: existingStock.shares + shares };
    response = await updateTradeService(symbol, portfolio_id, payload);
  }

  return successResponse(res, 200, { trade: response });
};

/**
 * Sell selected amount of owned stock
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const sellStock = async (req, res, next) => {
  successResponse(res, 200);
};

/**
 * Get total value of portfolio
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const getPortfolioValue = async (req, res, next) => {
  successResponse(res, 200);
};

/**
 * Get details of stock within a portfolio
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const getPortfolioPositions = async (req, res, next) => {
  successResponse(res, 200);
};

module.exports = {
  sellStock: catchAsync(sellStock),
  purchaseStock: catchAsync(purchaseStock),
  getPortfolio: catchAsync(getPortfolio),
  createPortfolio: catchAsync(createPortfolio),
  getPortfolioValue: catchAsync(getPortfolioValue),
  getPortfolioPositions: catchAsync(getPortfolioPositions),
};
