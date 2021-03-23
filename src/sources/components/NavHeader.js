import React from 'react';
import '../assets/styles.css';
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventIcon from '@material-ui/icons/Event';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

// Context Controllers
import { AuthContext } from '../AuthController';

const barStyles = {
    filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25))',
};

const brandingStyles = {
    flexGrow: '20',
};

export default function NavigationHeader(props) {
    const user = useContext(AuthContext);

    const notLoggedIn = () => {
        return (
            <AppBar position="sticky" style={barStyles}>
                <Toolbar>
                    <Grid container direction="row" spacing={3} alignItems="center">
                        <Grid item lg={8}>
                            <Link
                                to="/"
                                className="container"
                                style={brandingStyles}
                                href="index.html"
                            >
                                <img src={logo} className="logo" alt="Website Logo" />
                                <div className="logoLine" />
                                <h1 id="headerName">Sched-It</h1>
                            </Link>
                        </Grid>

                        <Grid item lg={1} container justify="center">
                            <Link to="/" className="navItem">
                                Home
                            </Link>
                        </Grid>

                        <Grid item lg={1} container justify="center">
                            <Link to="/about" className="navItem">
                                About
                            </Link>
                        </Grid>

                        <Grid item lg={1} container justify="center">
                            <Link to="/register" className="navItem">
                                Register
                            </Link>
                        </Grid>

                        <Grid item lg={1} container justify="center">
                            <Link to="/login" className="navItem">
                                Login
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    };

    const options = [
        { text: 'My Calendar', icon: EventIcon },
        { text: 'Complete Events', icon: CheckBoxIcon },
        { text: 'My Invites', icon: SendIcon },
        { text: 'Inbox', icon: MailIcon },
        { text: 'Delete Event', icon: DeleteSweepIcon },
    ];

    const drawerWidth = 300;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        },
        title: {
            flexGrow: 1,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginRight: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        },
        footerButtons: {
            position: 'fixed',
            bottom: '0',
            width: '100%',
            height: '60',
        },
    }));

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const loggedIn = () => {
        return (
            <div className={classes.root}>
                <AppBar
                    position="sticky"
                    style={barStyles}
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <Grid container direction="row" spacing={3} alignItems="center">
                            <Grid item lg={8}>
                                <Link
                                    to="/"
                                    className="container"
                                    style={brandingStyles}
                                    href="index.html"
                                >
                                    <img src={logo} className="logo" alt="Website Logo" />
                                    <div className="logoLine" />
                                    <h1 id="headerName">Sched-It</h1>
                                </Link>
                            </Grid>
                        </Grid>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            className={clsx(open && classes.hide)}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />

                    <List>
                        {options.map((images) => (
                            <Grid container>
                                <ListItem button key={images.text}>
                                    <ListItemIcon>
                                        <images.icon fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={images.text} />
                                </ListItem>
                            </Grid>
                        ))}
                    </List>

                    <List className={classes.footerButtons}>
                        <ListItem button key="My Profile">
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary="My Profile" />
                        </ListItem>
                        <ListItem button key="Log Out">
                            <ListItemIcon>
                                <PowerSettingsNewIcon fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    };

    if (user !== undefined) {
        //CHANGE THIS FOR TESTING PURPOSES ONLY
        return loggedIn();
    } else {
        return notLoggedIn();
    }
}
