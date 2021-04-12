/**
 * This component takes a callback upon where to update the selected user.
 */

 import {
    Grid,
    TextField,
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

export default function SearchUser(props) {

    const handleClose = () => {
        props.setDialogOpen(false);
    };

    const handleSelect = () => {
        props.setDialogOpen(false);
    };

    return (
        <div>
            <Dialog open={props.dialogOpen} TransitionComponent={Transition} onClose={handleClose}>
                <DialogTitle id="alert-dialog=slide=title">Search User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container direction="column" alignItems="stretch" spacing={2}>
                            
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};