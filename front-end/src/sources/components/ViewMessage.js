import React, { useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewMessage(props) {
    // Set the dialog state
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState(null);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Dialog open={open} TransitionComponent={Transition}>
                <DialogTitle id="alert-dialog=slide=title"></DialogTitle>
            </Dialog>
        </div>
    );
}
