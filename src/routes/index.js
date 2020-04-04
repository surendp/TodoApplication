const TodoController = require('../controller');

const routes = (app, dbClient) => {
  app.get('/', (req, res) => res.send('Hello world!'));

  app.post('/todos', (req, res) => {
   return TodoController.postTodo(req, res, dbClient);
  });
  
  app.get('/todos', (req, res) => {
    return TodoController.getTodos(req, res, dbClient);
  });
  
  app.delete('/todos/:id', (req, res) => {
    TodoController.deleteTodo(req, res, dbClient);
  });
};

module.exports = routes;