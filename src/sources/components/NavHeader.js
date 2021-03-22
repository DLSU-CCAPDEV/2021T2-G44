import React from 'react';
import '../assets/styles.css';
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { Grid, SvgIcon } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//Images
import calendar from '../assets/calendar.svg';
import star from '../assets/star.svg';
import send from '../assets/send.svg';
import inbox from '../assets/inbox.svg';
import deleteIcon from '../assets/deleteIcon.svg';

// Context Controllers
import { AuthContext } from '../AuthController';
import { AutorenewOutlined } from '@material-ui/icons';

const barStyles = {
    filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25))',
};

const brandingStyles = {
    flexGrow: '20',
};

const listStyles = {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    width: '0',
    justify: 'center',
};

export default function NavigationHeader(props) {
    const user = useContext(AuthContext);

    const notLoggedIn = () => {
        return (
            <AppBar position="sticky" style={barStyles}>
                <Toolbar>
                    <Grid container direction="row" spacing={3} alignItems="center">
                        <Grid item xs={8}>
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

                        <Grid item xs={1} container justify="center">
                            <Link to="/" className="navItem">
                                Home
                            </Link>
                        </Grid>

                        <Grid item xs={1} container justify="center">
                            <Link to="/about" className="navItem">
                                About
                            </Link>
                        </Grid>

                        <Grid item xs={1} container justify="center">
                            <Link to="/register" className="navItem">
                                Register
                            </Link>
                        </Grid>

                        <Grid item xs={1} container justify="center">
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
        { text: 'My Calendar', image: calendar },
        { text: 'Complete Events', image: star },
        { text: 'My Invites', image: send },
        { text: 'Inbox', image: inbox },
        { text: 'Delete Event', image: deleteIcon },
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
                            <Grid item xs={8}>
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
                            <MenuIcon />
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
                        {/* {options.map((images) => (
                            <ListItem button key={images.text}>
                                <ListItemIcon>
                                    <img src={images.image} />
                                </ListItemIcon>

                                <ListItemText primary={images.text} />
                            </ListItem>
                        ))} */}
                        <ListItem button key="My Calendar">
                            <ListItemIcon>
                                <img src={calendar} />
                            </ListItemIcon>

                            <ListItemText primary="My Calendar" />
                        </ListItem>
                        <ListItem button key="Completed Events">
                            <ListItemIcon>
                                <img src={star} />
                            </ListItemIcon>

                            <ListItemText primary="Completed Events" />
                        </ListItem>
                        <ListItem button key="My Invites">
                            <ListItemIcon>
                                <img src={send} />
                            </ListItemIcon>

                            <ListItemText primary="My Invites" />
                        </ListItem>
                        <ListItem button key="Inbox">
                            <ListItemIcon>
                                <img src={inbox} />
                            </ListItemIcon>

                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button key="Delete Event">
                            <ListItemIcon>
                                <img src={deleteIcon} />
                            </ListItemIcon>

                            <ListItemText primary="Delete Event" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    };

    if (user === undefined) {
        //CHANGE THIS FOR TESTING PURPOSES ONLY
        return loggedIn();
    } else {
        return notLoggedIn();
    }
}
