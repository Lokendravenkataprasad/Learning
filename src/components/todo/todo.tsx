import { useState, FC } from 'react';
import {
    Button,
    Checkbox,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import './todo.css';

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    disableTodo: boolean;
}

const Todo: FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [editIndex, setEditIndex] = useState<number>();

    const handleAddTodo = () => {
        if (editIndex !== undefined) {
            const filterTodo = todos.filter((todo, i) => i !== editIndex);
            const editTodo: TodoItem = {
                ...todos[editIndex],
                text: inputText,
            };
            setTodos(
                [...filterTodo, editTodo].sort((a, b) => {
                    if (a.disableTodo && !b.disableTodo) {
                        return 1;
                    }
                    if (!a.disableTodo && b.disableTodo) {
                        return -1;
                    }
                    return 0;
                }),
            );
            setEditIndex(undefined);
        } else {
            if (inputText.trim() !== '') {
                const newTodo: TodoItem = {
                    id: todos.length + 1,
                    text: inputText,
                    completed: false,
                    disableTodo: false,
                };
                setTodos(
                    [...todos, newTodo].sort((a, b) => {
                        if (a.disableTodo && !b.disableTodo) {
                            return 1;
                        }
                        if (!a.disableTodo && b.disableTodo) {
                            return -1;
                        }
                        return 0;
                    }),
                );
            }
        }
        setInputText('');
    };

    const handleTodoComplete = (id: number) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        );
        setTodos(updatedTodos);
    };

    const handleTodoDelete = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleTodoEdit = (index: number) => {
        const findTodo = todos[index]?.text;
        if (findTodo) {
            setInputText(findTodo);
            setEditIndex(index);
        }
    };

    const handleTodoCompleted = (index: number) => {
        const updatedTodos: TodoItem[] = todos.map((todo, i) => {
            if (i === index) {
                return { ...todo, disableTodo: true };
            }
            return todo;
        });
        setTodos(
            updatedTodos.sort((a, b) => {
                if (a.disableTodo && !b.disableTodo) {
                    return 1;
                }
                if (!a.disableTodo && b.disableTodo) {
                    return -1;
                }
                return 0;
            }),
        );
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '10px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Todo List
            </Typography>
            <TextField
                label="Add Todo"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTodo();
                    }
                }}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddTodo}
                fullWidth
            >
                Add
            </Button>
            <List>
                {todos.map((todo, index) => (
                    <ListItem
                        key={todo.id}
                        disablePadding
                        sx={{
                            pointerEvents: todo?.disableTodo ? 'none' : 'auto',
                            opacity: todo?.disableTodo ? 0.5 : 1,
                            background: '#F1F1F2',
                            padding: '10px',
                            margin: '10px 0px',
                        }}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={todo.completed}
                                onChange={() => handleTodoComplete(todo.id)}
                            />
                        </ListItemIcon>
                        {todo?.disableTodo ? (
                            <s>{todo.text}</s>
                        ) : (
                            <ListItemText primary={todo.text} />
                        )}

                        <ListItemSecondaryAction className="action-button">
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => handleTodoCompleted(index)}
                                disabled={todo.disableTodo}
                            >
                                completed
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => handleTodoEdit(index)}
                                disabled={todo.disableTodo}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleTodoDelete(todo.id)}
                                disabled={todo.disableTodo}
                            >
                                Delete
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Todo;
