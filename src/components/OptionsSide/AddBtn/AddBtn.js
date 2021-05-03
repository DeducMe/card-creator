import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
const useStyles = makeStyles((theme) => ({
    optionsFab:{
        position: 'fixed',
        bottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
    }

}))

function AddDialog(props) {
    const { onClose, selectedValue, open, optionsState } = props;
    const {onAddHeader, onAddDescription, onAddButtons} = props.actions

    const [disabledHeader, setDisabledHeader] = React.useState(false);
    const [disabledDescription, setDisabledDescription] = React.useState(false);
    const [disabledButtons, setDisabledButtons] = React.useState(false);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        switch (value){
            case 'header':
                onAddHeader()
                setDisabledHeader(true)
                break
            case 'description':
                onAddDescription()
                setDisabledDescription(true)
                break
            case 'buttons':
                onAddButtons()
                setDisabledButtons(true)
                break
            default:
                break
        }
    };

    useEffect(() => {
        optionsState.header ? setDisabledHeader(true) : setDisabledHeader(false) 
        optionsState.description ? setDisabledDescription(true) : setDisabledDescription(false)
        optionsState.buttons ? setDisabledButtons(true) : setDisabledButtons(false) 
    },[optionsState]);

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Add Component</DialogTitle>
            <List>
                <ListItem disabled={disabledHeader} autoFocus button onClick={() => handleListItemClick('header')}>
                    <AddIcon />
                    <ListItemText primary="Add Header" />
                </ListItem>
                <ListItem disabled={disabledDescription} autoFocus button onClick={() => handleListItemClick('description')}>
                    <AddIcon />
                    <ListItemText primary="Add Description" />
                </ListItem>
                <ListItem disabled={disabledButtons} autoFocus button onClick={() => handleListItemClick('buttons')}>
                    <AddIcon />
                    <ListItemText primary="Add Buttons" />
                </ListItem>
            </List>
        </Dialog>
    )
}

function AddBtn({onAddHeader, onAddDescription, onAddButtons, optionsState}){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('header');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
    return(
        <Box className={classes.optionsFab}>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            
            <AddDialog selectedValue={selectedValue} open={open} onClose={handleClose} actions={{onAddHeader, onAddDescription, onAddButtons}} optionsState={optionsState}/>
        </Box>
    )
}

const mapStateToProps = (state) =>{
    return {
        optionsState:state.options
    }
}
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onAddHeader: () => {
            dispatch({type : 'ADD_HEADER', payload:null})
        },
        onAddDescription: () => {
            dispatch({type : 'ADD_DESCRIPTION', payload:null})
        },
        onAddButtons: () => {
            dispatch({type : 'ADD_BUTTON', payload:null})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBtn);