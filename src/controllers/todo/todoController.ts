import { Todo } from '../../models/todo';

let todos: Todo[] = [];
type RequestBody = { text: string };
type RequestParams = { todoId: string };

export const getTodos = async (req: any, res: any) => {
    res.status( 200 ).json({ todos: todos });
}

export const postTodo = async (req: any, res: any) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }

    todos.push(newTodo);

    return res.status(200).json({ message: 'Added correctly', todo: newTodo, todos: todos });
}

export const putTodo = async (req: any, res: any) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);

    if(todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'Updated todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
}

export const deleteTodo = async (req: any, res: any) => {
    const params = req.params as RequestParams;
    todos = todos.filter( todoItem => todoItem.id !== params.todoId);

    res.status(200).json({ message: 'Deleted todo', todos: todos });
}