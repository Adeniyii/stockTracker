/* eslint-disable no-unused-vars */
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const successResponse = require('../util/successHandler');

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
