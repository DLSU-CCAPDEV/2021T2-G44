import { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Controller & Loading Import
import { getTodo, addTodo, toggleTodo, deleteTodo } from '../../controllers/TodoController';
import Loading from './Loading';

const styles = {
    completed: {
        textDecoration: 'line-through',
        opacity: '.5',
        display: 'flex',
        width: '100%',
    },
    header: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '1em',
    },
    main: {
        width: '100%',
        maxWidth: '400px',
        margin: '20px auto',
    },
    card: {
        padding: '20px',
        margin: '20px 0',
        overflow: 'auto',
        maxHeight: '625px',
    },
    todo: {
        position: 'relative',
        display: 'flex',
        flexFow: 'row',
        alignContent: 'space-between',
    },
    label: {
        display: 'flex',
        width: '100%',
    },
    divider: {
        position: 'absolute',
        width: '100%',
        top: 0,
    },
};

export default function TodoComponent(props) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const [snackbar, setSnackbar] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load data
    useEffect(() => {
        const prepareComponent = async () => {
            setLoading(true);
            const data = await getTodo();
            if(!data.success) {
                setSnackbar(data.errors[0].msg);
                setTimeout(() => setSnackbar(null), 5000);
                return;
            }

            setTasks(data.todos);
            setLoading(false);
        };

        prepareComponent().catch(err => {
            console.error(err);
            setSnackbar(err);
            setTimeout(() => setSnackbar(null), 5000);
        });
    }, []);

    // Event Handlers
    const handleAddTask = async () => {
        setSnackbar("Adding to-do list item");
        setNewTask("");
        const addStatus = await addTodo(newTask);
        if(!addStatus.success) {
            setSnackbar(addStatus.errors[0].msg);
            setTimeout(() => setSnackbar(null), 5000);
            return;
        }

        // Add task
        setTasks([ addStatus.todo, ...tasks ]);

        setSnackbar(null);
    };

    const handleDeleteTask = async (todoID) => {
        const resultIndex = tasks.findIndex(val => val._id === todoID);
        const todo = tasks[resultIndex];
        tasks.splice(resultIndex, 1);
        setTasks([ ...tasks ]);
        const deleteStatus = await deleteTodo(todo._id);
        if(!deleteStatus.success) {
            setSnackbar(deleteStatus.errors[0].msg);
            setTimeout(() => setSnackbar(null), 5000);

            // Undo delete
            setTasks([ ...tasks, todo ]);

            return;
        }
    };

    const handleTaskToggle = async (todoID) => {        
        const resultIndex = tasks.findIndex(val => val.todoID === todoID);
        const todo = tasks[resultIndex];
        todo.completed = !todo.completed;
        tasks.splice(resultIndex, 1);
        setTasks([ ...tasks, todo ]);

        const toggleStatus = await toggleTodo(todo._id);
        if(!toggleStatus.success) {
            setSnackbar(toggleStatus.errors[0].msg);
            setTimeout(() => setSnackbar(null), 5000);

            // Reset toggle
            const resetIndex = tasks.findIndex(val => val.todoID === todoID);
            todo.completed = !todo.completed;
            tasks.splice(resetIndex, 1);
            setTasks([ ...tasks, todo ]);

            return;
        }
    };

    if(!loading)
        return (
            <div id="main" style={styles.main}>
                <Snackbar
                        open={snackbar ? true : false}
                        onClose={() => setSnackbar(null)}
                        message={snackbar}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        key={"topcenter"}
                    />
                <header style={styles.header}>
                    <TextField label="Add new task" value={newTask} onChange={e => setNewTask(e.target.value)} fullWidth={true} />
                    <Button variant="raised" color="primary" disabled={newTask.length === 0} onClick={handleAddTask}>
                        Add
                    </Button>
                </header>
                {tasks.length > 0 && (
                    <Card style={styles.card}>
                        <FormGroup>
                            {tasks.map((task, index) => (
                                <div key={task._id} style={styles.todo}>
                                    {index > 0 ? <Divider style={styles.divider} /> : ''}
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={task.completed}
                                                onChange={() => handleTaskToggle(task._id)}
                                            />
                                        }
                                        label={task.title}
                                        style={task.completed ? styles.completed : styles.label}
                                    />     
                                    <Tooltip title="Delete task" placement="top">
                                    <IconButton aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </Tooltip>
                                </div>
                            ))}
                        </FormGroup>
                    </Card>
                )}
            </div>
        ); 
    return <Loading loadingText="Loading your to-do list"/>
};