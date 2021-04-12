/**
 * This component takes a callback upon where to update the selected event.
 */

import React, { useState } from "react";

import { InputBase, TextField } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";

// Import the Search Controller
import { SearchEvent as SearchAnEvent } from "../../controllers/SearchController";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.primary.main, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.primary.main, 0.5),
        },
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: 0,
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        marginRight: "1em",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
}));

export default function SearchEvent(props) {
    const [eventList, setEventList] = useState([]);

    const handleInputChange = async (event, value, reason) => {
        if (reason === "input") setEventList(await SearchAnEvent(value));
    };

    return (
        <div>
            <Autocomplete
                freeSolo
                renderInput={(params) => <SearchBox {...params} />}
                onInputChange={handleInputChange}
                options={eventList}
                getOptionLabel={(event) => event.title}
                //filter={(s, k) => true}
            />
        </div>
    );
}

const SearchBox = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <TextField
                {...props}
                placeholder="Search Event"
                classes={{
                    root: classes.inputRoot,
                }}
                InputProps={{
                    ...props.InputProps,
                    disableUnderline: true,
                    className: classes.inputInput,
                }}
            />
        </div>
    );
};
