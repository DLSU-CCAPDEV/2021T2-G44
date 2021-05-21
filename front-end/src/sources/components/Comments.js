import React, { useState } from 'react';

// Material UI
import { Paper, Typography, TextField, Button, Divider, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material UI icons
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';

const customStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    comments: {
        marginLeft: '25em',
        marginRight: '25em',
        marginBottom: '2em',
        backgroundColor: theme.palette.accent.main,
    },
    content: {
        padding: '2em',
    },
    commentBox: {
        backgroundColor: theme.palette.primary.main,
        margin: '0.5em',
        padding: '1em',
    },
    commentAuthor: {
        marginLeft: '1em',
        fontWeight: 'bold',
        color: theme.palette.accent.main,
    },
    commentContent: {
        color: theme.palette.accent.main,
        marginLeft: '3.5em',
    },
}));

export default function Comments() {
    const classes = customStyles();

    const dummyData = [
        { author: 'Lorenzo Querol', content: 'I love Horimiya!' },
        { author: 'Gian Madrid', content: 'Ram ranch really rocks!' },
        { author: 'Adi Amogus', content: 'I need new headphones' },
    ];

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(dummyData);

    const onTextUpdate = (event) => {
        setNewComment(event.target.value);
    };

    const addComment = (task) => {
        comments.push({ author: '$AUTHOR_NAME', content: newComment });
        setComments(comments);
        setNewComment('');
    };

    return (
        <Paper elevation={5} className={classes.comments}>
            <div className={classes.content}>
                <Typography variant="h4" className={classes.title}>
                    Comments
                </Typography>
                <TextField
                    id="outlined-full-width"
                    style={{ margin: 8 }}
                    placeholder="Write a comment!"
                    value={newComment}
                    onChange={onTextUpdate}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                    style={{ 'marginBottom': '1em' }}
                    onClick={addComment}
                >
                    Enter Comment
                </Button>

                <Divider />

                <Grid container direction="column">
                    {comments.map((comment) => (
                        <Paper className={classes.commentBox}>
                            <Grid item container direction="column">
                                <Grid item container direction="row" alignItems="center">
                                    <Avatar></Avatar>
                                    <Typography className={classes.commentAuthor}>{comment.author}</Typography>
                                </Grid>
                                <Grid item container direction="row" alignItems="center">
                                    <Typography className={classes.commentContent}>{comment.content}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Grid>
            </div>
        </Paper>
    );
}
