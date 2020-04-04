const TodoService = require('../service');

const TodoController = {
  getTodos: async (req, res, dbClient) => {
    const todos = await TodoService.getTodos(dbClient);

    if (!todos) {
      return res.status(400).json({
        statusCode: 400,
        message: "Failed to create a todo",
        error: ["Something went wrong"],
      }).end();
    }

    return res.status(200).json({
      statusCode: 200,
      message: "successfully retrived the list",
      data: todos,
    }).end();
  },

  postTodo: async (req, res, dbClient) => {
    try {
      if (!(req.body && req.body.todo)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Failed to create a todo",
          error: ["Empty string not accepted"],
        }).end();
      }
  
      // extract the text from request body and 
      // call the service to post the todo
      const { todo } = req.body;
      const newTodo = await TodoService.postTodo(todo, dbClient);

      if (newTodo) {
        return res.status(200).json({
          statusCode: 200,
          message: "success",
          data: {
            ...newTodo,
          },
        });
      }

      throw new Error();
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        message: "Failed to create a todo",
        error: ["Something went wrong"],
      }).end();
    }
  },

  deleteTodo: async (req, res, dbClient) => {
    try{
      const { id } = req.params;
  
      if (id) {
        const deletedTodo = await TodoService.deleteTodo(id, dbClient);
    
        if (deletedTodo) {
          return res.status(200).json({
            statusCode: 200,
            message: `Successfully deleted the Todo with id ${id}`,
            data: {
              ...deletedTodo,
            },
          }).end();
        }
      }
  
      throw new Error();
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        statusCode: 400,
        message: "Failed to delete a todo",
        error: ["Something went wrong!! May be because of invalid id"],
      }).end();
    }
  },
};

module.exports = TodoController;