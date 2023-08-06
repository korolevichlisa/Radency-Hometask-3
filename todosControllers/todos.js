
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

  updateTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

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
    }
    else if (!req.body.completed) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const newTodo = {
      id: todoFound.id,
      text: req.body.text || todoFound.text,
      textDes: req.body.textDes || todoFound.textDes,
      category: req.body.category || todoFound.category,
      completed:req.body.completed || todoFound.completed,
    };

    db.splice(itemIndex, 1, newTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      newTodo,
    });
  }

  getAggregated(req,res){


    const id =req.params.category;

    let countTask = 0
    let countIdea = 0
    let countRandom = 0
    db.map(note => {
      switch (note.category){
      case "Task": countTask +=1; break
      case "Idea": countIdea +=1;break
      case "Random Thought": countRandom +=1;break
      }
    })
    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      countTask,countIdea,countRandom
    });

  }

  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Todo deleted successfuly',
    });
  }
}

const todoController = new TodosController();
export default todoController;