import TodoService from '../service';

class TodoController {
  private todoService: TodoService;

  constructor (todoService: TodoService) {
    this.todoService = todoService;
  }

  async getTodos (req, res) {
    const todos = await this.todoService.getTodos();

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
  }

  async postTodo (req, res) {
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
      const newTodo = await this.todoService.postTodo(todo);

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
  }

  async deleteTodo (req, res) {
    try{
      const { id } = req.params;
  
      if (id) {
        const deletedTodo = await this.todoService.deleteTodo(id);
    
        if (deletedTodo) {
          return res.status(200).json({
            statusCode: 200,
            message: `Successfully deleted the Todo with id ${id}`,
          }).end();
        } else if (!deletedTodo) {
            return res.status(400).json({
              statusCode: 400,
              message: "Failed to delete a todo",
              error: [`Todo with id ${id} does not exists in the database!!`],
            }).end();
          }
        }
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        statusCode: 400,
        message: "Failed to delete a todo",
        error: ["Something went wrong!!"],
      }).end();
    }
  }
}

export default TodoController;