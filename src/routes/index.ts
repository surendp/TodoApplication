import { Router } from 'express';
import TodoController from '../controller';

export class SetupRoutes {
  private applicationRouter: Router;
  private todoController: TodoController;

  constructor(todoController: TodoController) {
    this.applicationRouter = new Router();
    this.todoController = todoController;
    this.setupRoutes();
  }

  private setupRoutes () {
    this.applicationRouter
      .route('/')
      .get((req, res) => res.send('Hello world!'));

    this.applicationRouter
      .route('/todos')
      .get((req, res) => this.todoController.getTodos(req, res))
      .post((req, res) => this.todoController.postTodo(req, res));

    this.applicationRouter
      .route('/todos/:id')
      .delete((req, res) => this.todoController.deleteTodo(req, res));
  }

  getApplicationRouter () {
    return this.applicationRouter;
  }
}

export default SetupRoutes;