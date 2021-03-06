import React, { useState, useEffect, useContext } from 'react';
// import '../assets/styles.css';
import logo from '../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';

// Material UI
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventIcon from '@material-ui/icons/Event';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DateRangeIcon from '@material-ui/icons/DateRange';

import { logout } from '../../controllers/AuthController';
import { GetUserData } from '../../controllers/UserController';
import { GlobalContext } from '../../controllers/ContextController';

import logoSVG from '../assets/whiteLogo.svg';

const barStyles = {
    filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25))'
};

const brandingStyles = {
    flexGrow: '20',
};

const linkStyles = {
    color: '#212121',
    textDecoration: 'none',
};

const options = [
    { text: 'My Calendar', icon: DateRangeIcon, link: '/my-calendar', index: 0 },
    { text: 'My Events', icon: CalendarTodayIcon, link: '/my-events', index: 1 },
    { text: 'My Appointments', icon: CheckBoxIcon, link: '/my-appointments', index: 2 },
    { text: 'Public Events', icon: EventIcon, link: '/public-events', index: 3 },
    { text: 'Mail', icon: MailIcon, link: '/mail', index: 4 },
    { text: 'Invites', icon: SendIcon, link: '/invites', index: 5 },
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

    selected: {
        '&.Mui-selected': {
            backgroundColor: theme.palette.accent.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.accent.main,
            cursor: 'pointer',
        },
    },
}));

export default function NavigationHeader(props) {
    // Check logged in
    const { uid, updateUid } = useContext(GlobalContext);

    const [userData, setUserData] = useState(null);

    // Extract the Context
    const history = useHistory();

    useEffect(async () => {
        const userDataReq = await GetUserData();
        setUserData(userDataReq.userData);
    }, [uid]);

    const notLoggedIn = () => {
        return (
            <AppBar position="sticky" style={barStyles}>
                <Toolbar>
                    <Grid container direction="row" spacing={3} alignItems="center">
                        <Grid item lg={8}>
                            <Link to="/" className="container" style={brandingStyles}>
                                <img src={logoSVG} className="logo" alt="Website Logo" />
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

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        // Clear cookie
        setOpen(false);
        console.log('reasfd');
        history.push('/loading');
        logout()
            .then(() => updateUid())
            .then(() => history.push('/login'))
            .catch((err) => console.error(err));
    };

    const handleProfile = () => {
        handleDrawerClose();
        history.push('/profile');
    };

    const loggedIn = () => {
        return (
            <div className={classes.root} style={ { marginBottom: "1em" } }>
                <AppBar
                    position="fixed"
                    style={barStyles}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <Grid container direction="row" spacing={3} alignItems="center">
                            <Grid item lg={8}>
                                <Link to="/" className="container" style={brandingStyles} href="index.html">
                                    <img src={logoSVG} className="logo" alt="Website Logo" />
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
                            <Link to={images.link} style={linkStyles} onClick={handleDrawerClose}>
                                <ListItem
                                    button
                                    key={images.text}
                                    selected={selectedIndex === images.index}
                                    onClick={(event) => handleListItemClick(event, images.index)}
                                    className={classes.selected}
                                >
                                    <ListItemIcon>
                                        <images.icon fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={images.text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                    <List className={classes.footerButtons}>
                        <Link to="/profile" style={linkStyles} onClick={handleProfile}>
                            <ListItem
                                button
                                key="My Profile"
                                selected={selectedIndex === 4}
                                onClick={(event) => handleListItemClick(event, 4)}
                                className={classes.selected}
                            >
                                <ListItemIcon>
                                    { userData &&
                                        <Avatar alt="UserBlob" src={`${process.env.REACT_APP_BACK_END_API}/api/file/stream/${userData.avatar}`}>
                                            {`${userData.firstName[0]} ${userData.lastName[0]}`}
                                        </Avatar>
                                    }
                                </ListItemIcon>
                                <ListItemText primary="My Profile" />
                            </ListItem>
                        </Link>

                        <Link style={linkStyles} onClick={handleLogout}>
                            <ListItem
                                button
                                key="Log Out"
                                selected={selectedIndex === 5}
                                onClick={(event) => handleListItemClick(event, 5)}
                                className={classes.selected}
                            >
                                <ListItemIcon>
                                    <PowerSettingsNewIcon fontSize="large" />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </div>
        );
    };

    if (uid) return loggedIn();
    else return notLoggedIn();
}
