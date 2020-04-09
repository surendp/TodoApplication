import * as dotenv from 'dotenv';
import "reflect-metadata";
import DatabaseManager from './database-manager';
import ApplicationServer from './application-server';
import TodoController from './controller';
import TodoService from './service';
import SetupRoutes from './routes';

/**
 * Make the content of .env available all over the application
 */
dotenv.config();

/**
 * Initiate Database and establish Database connection
 */
const databaseManager: DatabaseManager = new DatabaseManager();
const client: Promise<any> = databaseManager.establishConnection();

/**
 * Setup application routes
 */
const todoService: TodoService = new TodoService(client);
const todoController: TodoController = new TodoController(todoService);
const setupRoutes: SetupRoutes = new SetupRoutes(todoController);

/**
 * Initiate Backend server, attach router to the express application
 * and start the server
 */
const applicationServer: ApplicationServer = new ApplicationServer();
applicationServer.use('/', setupRoutes.getApplicationRouter());
applicationServer.start(client);

