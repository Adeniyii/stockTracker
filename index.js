const http = require('http');
const app = require('./app');
const logger = require('./util/logger');

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled rejection at ${promise}, reason: ${reason.message}`);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM Received, Shutting down gracefully');

  server.close(() => {
    logger.info('Process Terminated because of SIGTERM');
  });
});
