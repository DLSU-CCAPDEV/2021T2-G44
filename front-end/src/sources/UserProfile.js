// Dependency Imports
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Controller Imports
import { GetUserData } from '../controllers/UserController';

// Material-UI Imports
import { Typography, Grid, Snackbar, Paper, makeStyles, withStyles, TextField } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import profilePic from './assets/stockAvatar.png';

// Component Imports
import Loading from './components/Loading';

import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// CUSTOM TABLE CELLS
const TableHeaderCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#7868E6',
        color: 'white',
        width: '20%',
        fontSize: '20px',
        textAlign: 'center',
    },
    body: {
        fontWeight: 'bold',
    },
}))(TableCell);

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: '4em',
            margin: '1em',
            width: '75%',
            height: '75%',
        },

        // marginTop: '4em',
        // margin: '1em',
        // width: '75%',
        // height: '75%',
    },
    profileGrid: {
        backgroundColor: theme.palette.accent.main,
        marginTop: '1em',
        marginBottom: '1em',

        display: 'flex',
    },
    profileShowcase: {
        height: '12em',
        width: '12em',
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '1em',
        marginRight: '1em',

        // display: 'flex',
        // alignSelf: 'center',
    },
}));
export default function UserProfile(props) {
    // State declarations
    const classes = useStyle();
    const history = useHistory();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState(null);

    // Get the userID
    const { userID } = useParams();

    useEffect(() => {
        // Get the user data by userID
        const prepareComponent = async () => {
            const userData = await GetUserData(userID);
            if (userData.success === false) {
                setSnackbar("There was a problem loading this user's account: " + userData);
                setTimeout(() => history.push('/my-calendar'), 5000);
                return;
            }
            setUserProfile(userData.userData);
        };

        setLoading(true);
        prepareComponent().then(() => setLoading(false));
    }, []);

    if (userProfile) {
        document.title = `Search - ${userProfile.firstName} ${userProfile.lastName}`;
    }

    return (
        <div>
            <Snackbar
                open={snackbar ? true : false}
                onClose={() => setSnackbar(null)}
                message={snackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key={'topcenter'}
            />
            {loading && <Loading loadingText="Loading user account" />}
            {!loading && (
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ padding: '4em 0 5em 0' }}
                >
                    <Grid item container direction="row" justify="center" alignItems="stretch">
                        <Grid container direction="row" justify="center" alignItems="stretch">
                            <Grid item direction="column" lg={6} className={classes.stretcher}>
                                <Paper variant="elevation" elevation={8} className={classes.profileGrid}>
                                    {/* Grid Inside Paper */}
                                    <Grid container direction="column">
                                        {/* Picture Grid */}
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            alignItems="center"
                                            className={classes.standardSpacer}
                                        >
                                            <Avatar
                                                alt="profilePicture"
                                                src={
                                                    `${process.env.REACT_APP_BACK_END_API}/api/file/stream/${userProfile.avatar}` ||
                                                    profilePic
                                                }
                                                className={classes.profileShowcase}
                                            />
                                        </Grid>

                                        {/* Name Grid */}
                                        <Grid item container direction="column" alignItems="center">
                                            <Typography variant="h5" align="left" className={classes.standardSpacer}>
                                                {`${userProfile.firstName} ${userProfile.lastName}`}
                                            </Typography>
                                            <TextField
                                                id="bioTextBox"
                                                label="Bio"
                                                multiline
                                                defaultValue={userProfile.bio}
                                                className={classes.standardSpacer}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                style={{
                                                    width: '80%',
                                                    marginTop: '1em',
                                                    marginBottom: '1em',
                                                }}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        {/* EVENTS */}
                                        <Grid item container direction="column" alignItems="center">
                                            <TableContainer
                                                component={Paper}
                                                style={{ width: '70%', marginTop: '1em', marginBottom: '1em' }}
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableHeaderCell>Events Partaking In</TableHeaderCell>
                                                    </TableRow>
                                                </TableHead>
                                            </TableContainer>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            ;
        </div>
    );
}
