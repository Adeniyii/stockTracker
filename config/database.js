const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Successfully connected to the database');
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('database connection failed. exiting now...');
      // eslint-disable-next-line no-console
      console.error(error);
      process.exit(1);
    });
};
