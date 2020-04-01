let database = {};

const TodoService = {
  getTodos: () => Object.values(database),

  postTodo: todoText => {
    const id = Object.values(database).length;
  
    // create new post
    const newPost = {
      id,
      todo: todoText,
    };
  
    // store in data base
    database = {
      ...database,
      [id]: {
        ...newPost,
      },
    };

    return newPost;
  },

  deleteTodo: todoId => {
    const todo = database[todoId];
    delete database[todoId];
    return todo;
  },
};

module.exports = TodoService;