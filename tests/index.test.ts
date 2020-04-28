import * as dotenv from 'dotenv';
import DatabaseManager from '../src/database-manager';
import TodoService from '../src/service';


describe("Perform get, post and delete request to the database", () => {
  let databaseManager;
  let connection;
  let todoService;

  beforeAll(async () => {
    dotenv.config();
    databaseManager = new DatabaseManager();
    connection = await databaseManager.establishConnection();
    todoService = new TodoService(connection);
  });

  afterAll(async () => {
    connection.close();
  });

  it(('should insert todo'), async () => {
    expect(typeof await todoService.postTodo('Create a todo')).toBe('object');
  });

  it('should get a list of todos', async () => {
    expect(typeof await todoService.getTodos()).toBe('object');
  });
});