const express = require('express');
const app = express();
const port = 4001;

/**
 * Establish Database connection
 * Run api server when the database connection is established
 * Run api documentation
 */
let database = {};

app.use(express.json())
app.get('/', (req, res) => res.send('Hello world!'));

app.post('/todos', (req, res) => {
  try {
    if (!(req.body && req.body.todo)) {
      console.log("Empty string not accepted");
      res.send({
        statusCode: 400,
        message: "Failed to create a todo",
        error: ["Empty string not accepted"],
      });
    }

    // extract the text from request body and 
    // generate an id of the todo
    const { todo } = req.body;
    const id = Object.values(database).length;

    // create new post
    const newPost = {
      id,
      todo,
    };
  
    // store in data base
    database = {
      ...database,
      [id]: {
        ...newPost,
      },
    };

    res.send({
      statusCode: 200,
      message: "success",
      data: {
        ...newPost,
      },
    });
  } catch (error) {
    res.send({
      statusCode: 400,
      message: "Failed to create a todo",
      error: ["Something went wrong"],
    });
  }
});

app.get('/todos', (req, res) => {
  res.send({
    statusCode: 200,
    message: "successfully retrived the list",
    data: Object.values(database),
  })
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (id && database[id]) {
    delete database[id];

    res.send({
      statusCode: 200,
      message: `Successfully deleted the Todo with id ${id}`,
    });
  }

  res.send({
    statusCode: 400,
    message: "Failed to delete a todo",
    error: ["Invalid id provided"],
  });
});

app.listen(port, () => console.log(`ToDo backend application is running on port ${port}`));
