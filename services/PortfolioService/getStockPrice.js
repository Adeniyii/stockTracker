const axios = require('axios').default;
const { IEX_TEST } = require('../../config/globals');

const { IEX_TOKEN } = process.env;

const AxiosInstance = axios.create({
  baseURL: IEX_TEST,
  params: { token: IEX_TOKEN },
});

exports.getCurrentPrice = async (symbol) => {
  const { data } = await AxiosInstance.get(`/stable/stock/${symbol}/price,`);
  return data;
};
