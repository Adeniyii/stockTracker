const axios = require('axios').default;
const { IEX_TEST } = require('../../config/globals');

const { IEX_TOKEN } = process.env;

exports.getCurrentPrice = async (symbol) => {
  const {
    data: { latestPrice },
  } = await axios.get(
    `${IEX_TEST}/stable/stock/${symbol}/quote?token=${IEX_TOKEN}&filter=latestPrice,`,
  );
  return latestPrice;
};
