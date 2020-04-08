class TodoService {
  private client: Promise<any>;

  constructor(client: Promise<any>) {
    this.client = client;
  }

  async getTodos () {
    try{
      const client = await this.client;
      const res = await client.query('SELECT * FROM todo_list');
      return res.rows;
    } catch (error) {
      console.error("Failed to get todo list!!\n", error);
    }
    return undefined;
  }

  async postTodo (todoText) {
    try {
      // create new post
      const client = await this.client;
      const res = await client.query('INSERT INTO todo_list(todo) VALUES ($1) RETURNING *', [todoText]);
      return res.rows[0];
    } catch (error) {
      console.error("Error from service (postTodo)", error);
      return undefined;
    }
  }

  async deleteTodo (todoId) {
    try{
      const client = await this.client;
      const res = await client.query('DELETE FROM todo_list WHERE id = $1 RETURNING *', [todoId]);
      return res.rows[0];
    } catch (error) {
      console.error("Error from service (deleteTodo)", error);
      return undefined;
    }
  }
}

export default TodoService;
