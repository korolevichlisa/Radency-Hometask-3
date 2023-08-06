
import db from '../db/db';

class TodosController {
  getAllTodos(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      todos: db,
    });
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);
     db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo,
        });
      }
    });
    return res.status(404).send({
      success: 'false',
      message: 'todo does not exist',
    });
  }

  createTodo(req, res) {
    if (!req.body.text) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.textDes) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }else if (!req.body.category) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }else if (!req.body.completed) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }
    const todo = {
      id: db.length + 1,
      text: req.body.text,
      textDes: req.body.textDes,
      category: req.body.category,
      completed: req.body.completed,
    };
    db.push(todo);
    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      todo,
    });
  }

  

  
}

const todoController = new TodosController();
export default todoController;