const express = require('express');
const routes = require('./routes');

const app = express();
const port = 4001;

/**
 * Establish Database connection
 * Run api server when the database connection is established
 * Run api documentation
 */
app.use(express.json());

/**
 * Setup routes in the application
 */
routes(app);

app.listen(port, () => console.log(`ToDo backend application is running on port ${port}`));
