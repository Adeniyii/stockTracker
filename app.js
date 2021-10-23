require('dotenv').config();
require('./config/database').connect();

const cors = require('cors');
const YAML = require('yamljs');
const morgan = require('morgan');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load swagger definition
const swaggerDefinition = YAML.load('./docs/definition.yaml');
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

// Redirect to docs on get to root
app.get('/', (req, res) => {
  res.redirect('/docs/v1');
});

// Require routes.
const authRouter = require('./routes/AuthRoute/index');

app.use('/auth', authRouter);
app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
