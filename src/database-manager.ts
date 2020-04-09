import { createConnection, Connection } from 'typeorm';
import { Todo } from './entities/todo';

class DatabaseManager {
  private options;

  constructor () {
    this.options = {
      type: "postgres",
      entities: [
        Todo
      ],
      synchronize: true,
      logging: false,
    };
  }

  public async establishConnection (): Promise<Connection | Error> {
    try {
      const connection: Connection = await createConnection(this.options);
      return connection;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default DatabaseManager;