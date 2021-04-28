import './assets/styles.css';

import { DropzoneDialog } from 'material-ui-dropzone';

import { useEffect, useState, React, Component } from 'react';

import Loading from './components/Loading';

// Component Imports
import { Paper } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Typography, Grid, TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { pink } from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';

import profilePic from './assets/heheAna.png';

import { GetUserData, editUserInfo, changePassword, deleteUser } from '../controllers/UserController';

// colored Delete Button
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(pink['A400']),
        backgroundColor: pink['A400'],
        '&:hover': {
            backgroundColor: pink[700],
        },
    },
}))(Button);

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        marginTop: '4em',
    },
    profileGrid: {
        backgroundColor: theme.palette.accent.main,
        marginLeft: '2em',
        marginTop: '1em',
        marginRight: '1em',

        display: 'flex',
    },
    settingsGrid: {
        backgroundColor: theme.palette.accent.main,
        marginLeft: '1em',
        marginTop: '1em',
        marginRight: '2em',
    },
    profileShowcase: {
        height: '15em',
        width: '15em',

        // display: flex,
        // alignSelf: Center,
    },
    emailField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),

        marginBottom: theme.spacing(2),
        width: '24em',
    },
    profileField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),

        marginBottom: theme.spacing(1),
        width: '17em',
    },
    standardSpacer: {
        marginTop: '1em',
        marginBottom: '1em',
    },
    buttonSpacing: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    textSpacer: {
        marginLeft: '1em',
        marginTop: '1em',
        marginBottom: '1em',
    },
    stretcher: {
        flexGrow: 1,
    },
    passField: {
        // marginTop: theme.spacing(2),
        width: '100%',
    },
    dividingClass: {
        marginTop: '1em',
        marginBottom: '1em',
    },
}));

export default function Profile() {
    const classes = useStyle();

    // State for User
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [bio, setBio] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [firstNameEditable, setFirstNameEditable] = useState(false);
    const [lastNameEditable, setLastNameEditable] = useState(false);
    const [bioEditable, setBioEditable] = useState(false);
    const [emailEditable, setEmailEditable] = useState(false);

    const [firstNameFieldVal, setFirstNameFieldVal] = useState('');
    const [lastNameFieldVal, setLastNameFieldVal] = useState('');
    const [bioFieldVal, setBioFieldVal] = useState('');
    const [emailFieldVal, setEmailFieldVal] = useState('');

    const [uploadAvatar, setUploadAvatar] = useState(false);

    const [changingPassword, setChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassFieldVal, setCurrentPassFieldVal] = useState('');
    const [newPassFieldVal, setNewPassFieldVal] = useState('');

    const [deleteAccConfirmation, setDeleteAccConfirmation] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [delPassFieldVal, setDelPassFieldVal] = useState('');

    useEffect(() => {
        document.title = 'Profile - Sched-It';

        // Get user data
        GetUserData()
            .then((data) => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setBio(data.bio);
                setEmail(data.email);
                setAvatar(data.avatar);

                setFirstNameFieldVal(data.firstName);
                setLastNameFieldVal(data.lastName);
                setBioFieldVal(data.bio);
                setEmailFieldVal(data.email);
            })
            .then(() => setLoading(false))
            .catch((err) => console.error(err));
    }, []);

    const handleBioChange = async (e) => {
        if (!bioEditable) {
            setBioEditable(true);
        } else {
            setBioEditable(false);
            const bioEditStatus = await editUserInfo({
                bio: bioFieldVal,
            });
            if (bioEditStatus != true) {
                alert(bioEditStatus);
                setFirstName(bio);
                console.log(bioEditStatus);
                return;
            }
            setBio(bioFieldVal);
        }
    };

    const handleFirstNameChange = async (e) => {
        if (!firstNameEditable) {
            setFirstNameEditable(true);
        } else {
            setFirstNameEditable(false);
            const firstNameEditStatus = await editUserInfo({
                firstname: firstNameFieldVal,
            });
            if (firstNameEditStatus != true) {
                alert(firstNameEditStatus);
                setFirstName(firstName);
                console.log(firstNameEditStatus);
                return;
            }
            setFirstName(firstNameFieldVal);
        }
    };

    const handleLastNameChange = async (e) => {
        if (!lastNameEditable) {
            setLastNameEditable(true);
        } else {
            setLastNameEditable(false);
            const lastNameEditStatus = await editUserInfo({
                lastname: lastNameFieldVal,
            });
            if (lastNameEditStatus != true) {
                alert(lastNameEditStatus);
                setLastName(lastName);
                console.log(lastNameEditStatus);
                return;
            }
            setLastName(lastNameFieldVal);
        }
    };

    const handleEmailChange = async (e) => {
        if (!emailEditable) {
            setEmailEditable(true);
        } else {
            setEmailEditable(false);
            const emailEditStatus = await editUserInfo({
                email: emailFieldVal,
            });
            if (emailEditStatus != true) {
                alert(emailEditStatus);
                setEmail(email);
                console.log(emailEditStatus);
                return;
            }
            setEmail(emailFieldVal);
        }
    };

    const handlePasswordChange = async (e) => {
        if (!changingPassword) {
            setChangingPassword(true);
        } else {
            setChangingPassword(false);
            const passwordChangeStatus = await changePassword({
                oldPassword: currentPassFieldVal,
                newPassword: newPassFieldVal,
            });
            if (passwordChangeStatus != true) {
                alert(passwordChangeStatus);
                console.log(passwordChangeStatus);
                return;
            }
            setShowPassword(false);
        }
    };

    const handleDeleteConfirmation = async (e) => {
        if (!deleteAccConfirmation) {
            // Opens the First Dialog Box
            setDeleteAccConfirmation(true);
            // Ensures the Second Dialog Box is not to be
            setDeleteAccount(false);
        } else {
            // Closes the First Dialog Box
            setDeleteAccConfirmation(false);
        }
    };

    const handleDeleteAccount = async (e) => {
        if (!deleteAccount) {
            // Opens The Second Dialog Box
            setDeleteAccount(true);
            // Closes The First Dialog Box
            setDeleteAccConfirmation(false);
            // ensures that the passcode is non visible for now
            setShowPassword(false);
        } else {
            // Closes the second Dialog Box
            setDeleteAccount(false);
            const accDeleteStatus = await deleteUser({
                password: delPassFieldVal,
            });
            if (accDeleteStatus != true) {
                alert(accDeleteStatus);
                console.log(accDeleteStatus);
                return;
            }
            // resets the showPass State
            setShowPassword(false);
        }
    };

    const handleShowPassword = (e) => {
        if (!showPassword) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    };

    if (!loading) {
        return (
            // entire main content page
            <Grid container direction="column" justify="center" alignItems="center" style={{ padding: '4em 0 5em 0' }}>
                <Grid item container direction="row" justify="center" alignItems="stretch">
                    <Grid container direction="row" justify="center" alignItems="stretch">
                        {/* The LeftHand side */}
                        {/* 
                    Todo: 
                    Profile Pic
                    Name
                    Bio
                    Change Bio Button 
                */}
                        <Grid item direction="column" lg={4} className={classes.stretcher}>
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
                                            src={avatar || profilePic}
                                            className={classes.profileShowcase}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.standardSpacer}
                                            startIcon={<PhotoCameraIcon />}
                                            onClick={() => setUploadAvatar(true)}
                                        >
                                            Change Profile Picture
                                        </Button>

                                        <DropzoneDialog
                                            filesLimit={1}
                                            acceptedFiles={['image/*']}
                                            cancelButtonText={'cancel'}
                                            submitButtonText={'submit'}
                                            maxFileSize={5000000}
                                            open={uploadAvatar}
                                            onClose={() => setUploadAvatar(false)}
                                            onSave={(files) => {
                                                setUploadAvatar(false);
                                                console.log('Files:', files);
                                            }}
                                            showPreviews={true}
                                            showFileNamesInPreview={true}
                                        />
                                    </Grid>

                                    <Divider variant="middle"></Divider>

                                    {/* Name Grid */}
                                    <Grid item container direction="column" alignItems="center">
                                        <Typography variant="h5" align="left" className={classes.standardSpacer}>
                                            {`${firstName} ${lastName}`}
                                        </Typography>
                                        <TextField
                                            id="bioTextBox"
                                            label="Bio"
                                            multiline
                                            defaultValue={bioFieldVal}
                                            className={classes.standardSpacer}
                                            InputProps={{
                                                readOnly: !bioEditable,
                                            }}
                                            style={{
                                                width: '90%',
                                            }}
                                            size="small"
                                            variant="outlined"
                                            onChange={(e) => setFirstNameFieldVal(e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.standardSpacer}
                                            startIcon={!bioEditable && <CreateIcon />}
                                            onClick={handleBioChange}
                                        >
                                            {bioEditable ? 'Confirm' : 'Edit Bio'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* The RightHand side */}
                        {/* 
                    Todo: 
                    Profile Details
                        FirstName TextBox / Change Button
                        Last Name TextBox / Change Button
                    DIVIDING LINE_____________________________
                    Email Address
                        Current Email TextBox / Change Button
                    DIVIDING LINE_____________________________
                    Password
                        Change Password Button
                    DIVIDING LINE_____________________________
                    Delete Account
                        Delete Account Button
                */}
                        <Grid item container direction="column" lg={8} justify="center" alignItems="stretch">
                            <Paper className={classes.settingsGrid} variant="elevation" elevation={8}>
                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Profile Settings</Typography>
                                </Grid>
                                <Grid item container direction="row" alignItems="center">
                                    <TextField
                                        id="firstNameTextBox"
                                        label="First Name"
                                        defaultValue={firstNameFieldVal}
                                        InputProps={{
                                            readOnly: !firstNameEditable,
                                        }}
                                        className={classes.profileField}
                                        size="small"
                                        variant="filled"
                                        onChange={(e) => setFirstNameFieldVal(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={!firstNameEditable && <CreateIcon />}
                                        onClick={handleFirstNameChange}
                                    >
                                        {firstNameEditable ? 'Confirm' : 'Edit'}
                                    </Button>
                                </Grid>

                                <Grid item container direction="row" alignItems="center">
                                    <TextField
                                        id="lastNameTextBox"
                                        label="Last Name"
                                        value={lastNameFieldVal}
                                        InputProps={{
                                            readOnly: !lastNameEditable,
                                        }}
                                        className={classes.profileField}
                                        size="small"
                                        variant="filled"
                                        onChange={(e) => setLastNameFieldVal(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={!lastNameEditable && <CreateIcon />}
                                        onClick={handleLastNameChange}
                                    >
                                        {lastNameEditable ? 'Confirm' : 'Edit'}
                                    </Button>
                                </Grid>

                                <Divider variant="middle"></Divider>

                                {/* EMAIL ADDRESS SECTION */}
                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Email</Typography>
                                </Grid>
                                <Grid item container direction="row" alignItems="center">
                                    <TextField
                                        id="emailTextBox"
                                        label="Address"
                                        value={emailFieldVal}
                                        className={classes.emailField}
                                        InputProps={{
                                            readOnly: !emailEditable,
                                        }}
                                        size="small"
                                        variant="filled"
                                        onChange={(e) => setEmailFieldVal(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={!emailEditable && <CreateIcon />}
                                        onClick={handleEmailChange}
                                    >
                                        {emailEditable ? 'Confirm' : 'Edit'}
                                    </Button>
                                </Grid>

                                <Divider variant="middle"></Divider>

                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Password</Typography>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonSpacing}
                                    startIcon={<VpnKeyIcon />}
                                    onClick={handlePasswordChange}
                                >
                                    Change Password
                                </Button>
                                <Dialog
                                    open={changingPassword}
                                    onClose={() => setChangingPassword(false)}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">Changing Your Password</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            In order to Change your password please enter your current password, along
                                            with your new password.
                                        </DialogContentText>
                                        <FormControl className={classes.passField} variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">
                                                Current Password
                                            </InputLabel>
                                            <FilledInput
                                                id="currentPasswordField"
                                                value={currentPassFieldVal}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleShowPassword}
                                                            onMouseDown={handleShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                onChange={(e) => setCurrentPassFieldVal(e.target.value)}
                                            />
                                        </FormControl>

                                        <Divider variant="middle" className={classes.dividingClass}></Divider>

                                        <FormControl className={classes.passField} variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
                                            <FilledInput
                                                id="newPasswordField"
                                                value={newPassFieldVal}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleShowPassword}
                                                            onMouseDown={handleShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                onChange={(e) => setNewPassFieldVal(e.target.value)}
                                            />
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setChangingPassword(false)} color="primary">
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handlePasswordChange}
                                            color="primary"
                                            startIcon={<LockIcon />}
                                        >
                                            Confirm Password
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Delete Account</Typography>
                                </Grid>
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonSpacing}
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDeleteConfirmation}
                                >
                                    Delete
                                </ColorButton>
                                <Dialog
                                    open={deleteAccConfirmation}
                                    onClose={handleDeleteConfirmation}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">Delete Sched-it Account?</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Are you sure you want to delete your Sched-It Account
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setDeleteAccConfirmation(false)} color="primary">
                                            Cancel
                                        </Button>
                                        <ColorButton
                                            variant="contained"
                                            color="primary"
                                            startIcon={<LockIcon />}
                                            onClick={handleDeleteAccount}
                                        >
                                            Yes I Want To Delete My Account
                                        </ColorButton>
                                    </DialogActions>
                                </Dialog>
                                <Dialog
                                    open={deleteAccount}
                                    onClose={handleDeleteAccount}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">Confirm Account Deletion</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Enter your Password below to DELETE your account.
                                        </DialogContentText>
                                        <FormControl className={classes.passField} variant="filled">
                                            <InputLabel htmlFor="delAccPasswordField">Enter Password</InputLabel>
                                            <FilledInput
                                                id="filled-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleShowPassword}
                                                            onMouseDown={handleShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                onChange={(e) => setDelPassFieldVal(e.target.value)}
                                            />
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() => {
                                                setDeleteAccount(false);
                                                setShowPassword(false);
                                            }}
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                        <ColorButton
                                            variant="contained"
                                            color="primary"
                                            startIcon={<DeleteIcon />}
                                            onClick={handleDeleteAccount}
                                        >
                                            Confirm Account Deletion
                                        </ColorButton>
                                    </DialogActions>
                                </Dialog>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    } else {
        // Return loading screen here
        return <Loading loadingText="Loading Profile Page" />;
    }
}
