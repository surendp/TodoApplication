import * as express from 'express';

class ApplicationServer {
  private app: express.Application;
  private port: number;

  constructor () {
    this.app = express();
    this.port = 4001;

    this.configure();
  }

  private configure () {
    this.app.use(express.json());
  }

  start (connection: Promise<any>) {
    connection
      .then(() => {
        console.log("Database connection successful!!");

        this.app.listen(
          this.port,
          () => console.log(`ToDo backend application is running on port ${this.port}`)
        );
      })
      .catch(error => {
        console.error("Connection refused!!", error);
      });
  }

  use (... props) {
    this.app.use(... props);
  }
}

export default ApplicationServer;