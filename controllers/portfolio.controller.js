/* eslint-disable no-unused-vars */
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const successResponse = require('../util/successHandler');
const { findUserById } = require('../services/UserService');
const {
  getTotalCash,
  getCurrentPrice,
  updatePortfolio,
  findAllPortfolio,
  findPortfolioById,
  findPortfolioByFilter,
  createPortfolioService,
  getTotalPortfolioValue,
} = require('../services/PortfolioService');
const {
  findTradeBySymbol,
  createTradeService,
  updateTradeService,
  findAllPortfolioTrades,
} = require('../services/TradeService');

/**
 * Create a new stock portfolio
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
const getSinglePortfolio = async (req, res, next) => {
  const { user_id } = req.params;
  const { portfolio_id } = req.query;

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
 * Get all user's portfolio
 * @param req
 * @param res
 * @param next
 */
const getAllPortfolio = async (req, res, next) => {
  const { user_id } = req.params;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can query for another user's portfolio
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  const portfolioList = await findAllPortfolio(user_id);

  if (!portfolioList || portfolioList.length < 1) {
    return next(new AppError('User has no portfolios', 404));
  }

  return successResponse(res, 200, { portfolio: portfolioList });
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
  const { user_id } = req.params;

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
  const { cash } = await getTotalCash(user_id, portfolio_id);

  if (cash < stockPrice * shares) {
    return next(new AppError('Insufficient funds', 404));
  }

  // create update DTO
  const updateObj = {
    cash: cash - stockPrice * shares,
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
 * Get total value of portfolio
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const getPortfolioValue = async (req, res, next) => {
  const { portfolio_id } = req.query;
  const { user_id } = req.params;

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

  const PortfolioValue = await getTotalPortfolioValue(portfolio_id);

  if (!PortfolioValue) {
    return next(new AppError('Portfolio value not found', 404));
  }

  return successResponse(res, 200, { PortfolioValue });
};

/**
 * Get details of stock within a portfolio
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const getPortfolioPositions = async (req, res, next) => {
  const { user_id } = req.params;
  const { portfolio_id } = req.query;

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

  // Get portfolio positions
  // find all trade for a portfolio
  const positions = await findAllPortfolioTrades(portfolio_id);
  return successResponse(res, 200, { positions });
};

/**
 * Sell selected amount of owned stock
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const sellStock = async (req, res, next) => {
  // TODO:implement controller, services and route.
  successResponse(res, 200);
};

module.exports = {
  sellStock: catchAsync(sellStock),
  purchaseStock: catchAsync(purchaseStock),
  createPortfolio: catchAsync(createPortfolio),
  getAllPortfolio: catchAsync(getAllPortfolio),
  getPortfolioValue: catchAsync(getPortfolioValue),
  getSinglePortfolio: catchAsync(getSinglePortfolio),
  getPortfolioPositions: catchAsync(getPortfolioPositions),
};
