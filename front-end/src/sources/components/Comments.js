import React, { useState } from 'react';

// Material UI
import { Paper, Typography, TextField, Button, Divider, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material UI icons
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';

// Controllers
import { GetUserData, GetUserID } from '../../controllers/UserController';
import { addComment } from '../../controllers/EventController';
import Loading from './Loading';

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

export default function Comments(props) {
    const classes = customStyles();

    // const dummyData = [
    //     { author: 'Lorenzo Querol', content: 'I love Horimiya!' },
    //     { author: 'Gian Madrid', content: 'Ram ranch really rocks!' },
    //     { author: 'Adi Amogus', content: 'I need new headphones' },
    // ];

    const [newComment, setNewComment] = useState('');
    const comments = props.comments;
    const setComments = props.setComments;
    const eventID = props.eventID;

    const onTextUpdate = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = async (task) => {
        const response = await GetUserID();
        const uid = response.uid;

        if(newComment === '') {
            alert("Comment content cannot be empty.");
            return;
        }

        const commentData = {
            author: uid,
            content: newComment,
        }

        const eventResponse = addComment ({eventID: eventID, comments: commentData });
        const uData = await GetUserData();
        commentData.user = {
            firstName: uData.userData.firstName,
            lastName: uData.userData.lastName,
            avatar: uData.userData.avatar
        }
        
        setComments([...comments, commentData]);
        setNewComment('');
    };

    if (props.comments) {
        console.log(props.comments);
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
                        onClick={handleAddComment}
                    >
                        Enter Comment
                    </Button>
    
                    <Divider />
    
                    <Grid container direction="column">
                        {comments.map((comment, index) => (
                            <Paper className={classes.commentBox} key={index}>
                                <Grid item container direction="column">
                                    <Grid item container direction="row" alignItems="center">
                                        <Avatar
                                            alt={`${comment.user.firstName} ${comment.user.lastName}`}
                                            src={`${process.env.REACT_APP_BACK_END_API}/api/file/stream/${comment.user.avatar}`}
                                        >
                                            {`${comment.user.firstName[0]}${comment.user.lastName[0]}`}
                                        </Avatar>
                                        <Typography className={classes.commentAuthor}>{`${comment.user.firstName} ${comment.user.lastName}`}</Typography>
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
    return <Loading loadingText="Loading Comments"/>
}
