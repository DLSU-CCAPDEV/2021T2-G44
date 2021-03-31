import React from 'react';
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

const styles = {
    done: {
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
        maxHeight: '450px',
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

class TodoComponent extends React.Component {
    state = {
        tasks: ['ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww', 'ww'],
        newTask: '',
    };

    onTextUpdate = (e) => {
        this.setState({ newTask: e.target.value });
    };

    addTask = () => {
        let { tasks, newTask } = this.state;
        tasks.push({ text: newTask, done: false });
        this.setState({ tasks: tasks, newTask: '' });
    };

    deleteTask = (task) => {
        let { tasks } = this.state;
        tasks.splice(tasks.indexOf(task), 1);
        this.setState({ tasks: tasks, newTask: '' });
    };

    toggle = (task) => {
        let { tasks } = this.state;
        tasks[tasks.indexOf(task)].done = !tasks[tasks.indexOf(task)].done;
        this.setState({ tasks: tasks, newTask: '' });
    };

    render() {
        const { tasks, newTask } = this.state;

        return (
            <div id="main" style={styles.main}>
                <header style={styles.header}>
                    <TextField label="Add new task" value={newTask} onChange={this.onTextUpdate} fullWidth={true} />
                    <Button variant="raised" color="primary" disabled={!newTask} onClick={this.addTask}>
                        Add
                    </Button>
                </header>
                {tasks.length > 0 && (
                    <Card style={styles.card}>
                        <FormGroup>
                            {tasks.map((task, index) => (
                                <div key={index} style={styles.todo}>
                                    {index > 0 ? <Divider style={styles.divider} /> : ''}
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={!task.done}
                                                onChange={() => this.toggle(task)}
                                            />
                                        }
                                        label={task.text}
                                        style={task.done ? styles.done : styles.label}
                                    />
                                    <Tooltip title="Delete task" placement="top">
                                        <IconButton aria-label="delete" onClick={() => this.deleteTask(task)}>
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
    }
}

export default TodoComponent;
