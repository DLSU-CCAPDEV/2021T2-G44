// IMPORTS
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        marginTop: '4em',
    },
}));

export default function MyAppointments() {
    const classes = useStyles();

    return <div className={classes.root}></div>;
}
