import React from 'react';
import logo from './assets/logo.svg';
import { useContext, useEffect } from 'react';
import { Fab, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

// React Scheduler Material UI
import { Scheduler, MonthView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Art
import calendarArt from './assets/calendarArt.svg';
const currentDate = '2021-03-23';

const style = {
    marginLeft: '5em',
};

export default function MyCalendar() {
    useEffect(() => {
        document.title = 'My Calendar';
    });

    return (
        <Grid container direction="column" style={{ position: 'relative', marginTop: '4em' }}>
            {/* My calendar and picture grid */}
            <Grid
                container
                direction="row"
                style={{ position: 'relative', marginTop: '2em', alignItems: 'center' }}
            >
                <Grid item style={{ marginLeft: '4em' }}>
                    <img src={calendarArt} style={{ position: 'relative' }} />
                </Grid>

                <Grid item style={{ marginLeft: '2em' }}>
                    <h1 style={{ fontSize: '45px' }}>My Calendar</h1>
                </Grid>
            </Grid>

            {/* calendar and to do list */}
            <Grid item>
                <Grid container direction="row">
                    <Grid item lg={8} style={{ position: 'relative', marginLeft: '4em' }}>
                        <Scheduler>
                            <ViewState>currentDate={currentDate}</ViewState>
                            <MonthView />
                        </Scheduler>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
