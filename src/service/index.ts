import { Todo } from '../entities/todo';

class TodoService {
  private connection: Promise<any>;

  constructor(connection: Promise<any>) {
    this.connection = connection;
  }

  async getTodos () {
    try{
      const connection = await this.connection;
      const todoRepository = connection.getRepository(Todo);
      const todoList = await todoRepository.find();
      return todoList;
    } catch (error) {
      console.error("Failed to get todo list!!\n", error);
      return undefined;
    }
  }

  async postTodo (todoText) {
    try {
      // create new post
      let newTodo: Todo = new Todo();
      newTodo.todo = todoText;

      const connection = await this.connection;
      const todoRepository = connection.getRepository(Todo);
      const savedTodo = await todoRepository.save(newTodo);
      return savedTodo;
    } catch (error) {
      console.error("Error from service (postTodo)", error);
      return undefined;
    }
  }

  async deleteTodo (todoId) {
    try{
      const connection = await this.connection;
      const todoRepository = connection.getRepository(Todo);
      const deletedTodo = await todoRepository.delete(todoId);
      return deletedTodo.affected;
    } catch (error) {
      console.error("Error from service (deleteTodo)", error);
      return error;
    }
  }
}

export default TodoService;
