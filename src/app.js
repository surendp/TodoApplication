const express = require('express');
const databaseManager = require('./databaseManager');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = 4001;

/**
 * Establish Database connection
 */
const client = databaseManager.establishConnection();

client
  .then(() => {
    console.log("Database connection successful!!");
    /**
     * Run api server when the database connection is established
     */
    app.use(express.json());

    /**
     * Setup routes in the application
     */
    routes(app, client);
    
    app.listen(port, () => console.log(`ToDo backend application is running on port ${port}`));
  })
  .catch(error => {
    console.error("Connection refused!!", error);
  });

