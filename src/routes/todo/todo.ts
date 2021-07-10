import { Router } from "express";
import * as todoController from '../../controllers/todo/todoController';
import { Todo } from '../../models/todo';

const router = Router();

let todos: Todo[] = [];

router.get('/', todoController.getTodos);

router.post('/', (req, res, nex) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }

    todos.push(newTodo);

    return res.status(200).json({ message: 'Added correctly', todo: newTodo, todos: todos });

});

router.put('/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);

    if(todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'Updated todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.delete('/:todoId', (req, res, next) => {
    todos = todos.filter( todoItem => todoItem.id !== req.params.todoId);

    res.status(200).json({ message: 'Deleted todo', todos: todos });
});

export default router;