const TodoController = require('../controller');

const routes = app => {
  app.get('/', (req, res) => res.send('Hello world!'));

  app.post('/todos', (req, res) => {
   return TodoController.postTodo(req, res);
  });
  
  app.get('/todos', (req, res) => {
    return TodoController.getTodos(req, res);
  });
  
  app.delete('/todos/:id', (req, res) => {
    TodoController.deleteTodo(req, res);
  });
};

module.exports = routes;