// Dependency Imports
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Controller Imports
import { GetUserData } from '../controllers/UserController';

// Material-UI Imports
import { Grid, Snackbar, Paper, makeStyles } from '@material-ui/core';

// Component Imports
import Loading from './components/Loading';

export  default function UserProfile(props) {
    // State declarations
    const history = useHistory();
    const [ userProfile, setUserProfile ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ snackbar, setSnackbar ] = useState(null);

    // Get the userID
    const { userID } = useParams();

    useEffect(() => {
        // Get the user data by userID
        const prepareComponent = async () => {
            const userData = await GetUserData(userID);
            if(userData === false) {
                setSnackbar("There was a problem loading this user's account: " + userData);
                setTimeout(() => history.push('/my-calendar'), 5000);
                return;
            }
            setUserProfile(userData);
        };

        setLoading(true);
        prepareComponent()
            .then(() => setLoading(false));
    }, []);

    if(userProfile) {
        document.title = `${userProfile.firstName} ${userProfile.lastName} - Profile`
    }

    return (
        <div>
            <Snackbar
                open={ snackbar ? true : false }
                onClose={ () => setSnackbar(null) }
                message={ snackbar }
                anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
                key={'topcenter'}
                />
            { loading && <Loading loadingText="Loading user account"/>}
            { !loading &&
                <Grid container direction="row" justify="center" alignItems="center">
                    <Paper elevation={3}>
                        <h1>Hello, world!</h1>
                        <p>User account of user with id: { userID }</p>
                    </Paper>
                </Grid>
            }
        </div>
    );
};