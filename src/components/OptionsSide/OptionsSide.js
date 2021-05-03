import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions  from '@material-ui/core/AccordionActions';
import CardActions from '@material-ui/core/CardActions';

import './optionsSide.css'
import AddBtn from './AddBtn/AddBtn'

class optionsSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header:{},
            description:{},
            buttons:[],
            image:'',
            generalOptions:{}
        };
    }

    handleGeneralOptionsCheckBoxChange = (event) =>{
        this.setState({ 
            generalOptions: {...this.state.generalOptions, [event.target.name]: event.target.checked}
        }, ()=>{
            this.handleGeneralOptionsSave()
        });
    }

    handleGeneralOptionsStylesChange = (styleName, styleValue, e) =>{
        styleValue = styleValue ? styleValue : (e.target.value)
        this.setState({ 
            generalOptions:{...this.state.generalOptions, styles: {...this.state.generalOptions.styles, [styleName]: styleValue}}
        }, ()=>{
            this.handleGeneralOptionsSave()
        });
    }

    handleGeneralOptionsSave = () =>{
        this.props.onChangeGeneralOptions(this.state.generalOptions)
    }

    handleHeaderChange = (e) =>{
        this.setState({
            header:{value:e.target.value}
        })
    }

    handleDescriptionChange = (e) => {
        this.setState({
            description:{value:e.target.value}
        })
    }

    handleButtonChange = (item, index, e) =>{
        console.log(item)
        item.value = e.target.value
        let newState = this.state.buttons
        newState[index] = item
        this.setState(newState);
    }

    handleHeaderSave = () => {
        console.log(this.state.header)
        this.props.onChangeHeader(this.state.header)
    }

    handleDescriptionSave = () => {
        console.log(this.state.description)
        this.props.onChangeDescription(this.state.description)
    }

    handleButtonSave = (index) => {
        this.props.onChangeButton(this.state.buttons[index] || "", index)
    }

    loadImage = (file) =>{
        this.setState({
            image:URL.createObjectURL(file)
        }, ()=>{
            this.props.onChangeImage(this.state.image)
        })
    }

    handleImageLoad = (e) =>{
        const file = e.target.files[0];
        e.target.value = ''; 

        this.loadImage(file)

    }

    dragOver = (e) => {
        e.preventDefault();
    }

    dragEnter = (e) => {
        e.preventDefault();
    }

    dragLeave = (e) => {
        e.preventDefault();
    }

    handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        this.loadImage(file)
    }

    handleDeleteImage = () =>{
        this.setState({
            image:''
        })
    }

    render() {
        return (
            <div className="options-side">
                <Card className="card-general-options"> 
                    <Typography gutterBottom variant="h5" component="h2">General</Typography>

                    <FormControlLabel
                        control={<Checkbox color="primary" checked={this.state.contentActive} onChange={this.handleGeneralOptionsCheckBoxChange.bind(this)} name="contentActive" />}
                        label="Active Content"
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={this.state.contentFlex} onChange={this.handleGeneralOptionsCheckBoxChange.bind(this)} name="contentFlex" />}
                        label="Flex Content"
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={this.state.contentInvert} onChange={this.handleGeneralOptionsCheckBoxChange.bind(this)} name="contentInvert" />}
                        label="Invert Content"
                    />

                    <TextField fullWidth  id="filled-basic" onChange={this.handleGeneralOptionsStylesChange.bind(this, 'contentWidth', null)} label="Width" variant="filled" type="number" />
                    <TextField fullWidth  id="filled-basic" onChange={this.handleGeneralOptionsStylesChange.bind(this, 'contentHeight', null)} label="Height" variant="filled" type="number" />

                    <Divider />
                    <CardActions className="jf-right">
                        <Button onClick={this.handleGeneralOptionsSave.bind(this)} size="small" color="primary">Save</Button>
                    </CardActions>
                </Card>
                {this.props.optionsState.buttons ? 

                <div className="component-block">
                    <Typography gutterBottom variant="h5" component="h2">Buttons</Typography>
                    {this.props.optionsState.buttons?.map((item, index)=>{
                        return <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={
                                        <TextField
                                        key={index}
                                        placeholder="Button Text"
                                        onChange={this.handleButtonChange.bind(this, item, index)}
                                        margin="normal"
                                        InputLabelProps={{
                                                shrink: true,
                                        }}
                                    />}
                                />
                                
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button onClick={this.props.onDeleteButton.bind(this, index)} size="small" color="secondary">Delete</Button>
                                <Button onClick={this.handleButtonSave.bind(this, index)} size="small" color="primary">
                                    Save
                                </Button>
                            </AccordionActions>
                        </Accordion>
                    })}
                    
                    
                    <IconButton className="add-btn" aria-label="add" onClick={this.props.onAddButton}>
                        <AddIcon></AddIcon>
                    </IconButton>
                </div>
                : ''}

                {this.props.optionsState.header ? 
                <div className="component-block">

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography gutterBottom variant="h5" component="h2">Header</Typography>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                placeholder="Header"
                                onChange={this.handleHeaderChange.bind(this)}
                                margin="normal"
                                InputLabelProps={{
                                        shrink: true,
                                }}
                            />
                        </AccordionDetails>
                        <Divider />
                            <AccordionActions>
                                <Button onClick={this.props.onDeleteHeader} size="small" color="secondary">Delete</Button>
                                <Button onClick={this.handleHeaderSave} size="small" color="primary">Save</Button>
                            </AccordionActions>
                    </Accordion>
                </div>: ''}

                {this.props.optionsState.description ? 
                <div className="component-block">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography gutterBottom variant="h5" component="h2">Description</Typography>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                placeholder="Description"
                                onChange={this.handleDescriptionChange.bind(this)}
                                margin="normal"
                                InputLabelProps={{
                                        shrink: true,
                                }}
                                multiline
                            />
                        </AccordionDetails>
                        <Divider />
                            <AccordionActions>
                                <Button onClick={this.props.onDeleteDescription} size="small" color="secondary">Delete</Button>
                                <Button onClick={this.handleDescriptionSave} size="small" color="primary">
                                    Save
                                </Button>
                            </AccordionActions>
                    </Accordion>
                </div>: ''}
                
                <div className="component-block">
                <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography gutterBottom variant="h5" component="h2">Image</Typography>
                            
                        </AccordionSummary>
                        <AccordionDetails className="flex-col">
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.imageActive} onChange={this.handleGeneralOptionsCheckBoxChange.bind(this)} name="imageActive" />}
                                label="Active image"
                            />
                            <TextField id="filled-basic" onChange={this.handleGeneralOptionsStylesChange.bind(this, 'imageWidth', null)} label="Width" variant="filled" type="number" />
                            <TextField className="m-bt" id="filled-basic" onChange={this.handleGeneralOptionsStylesChange.bind(this, 'imageHeight', null)} label="Height" variant="filled" type="number" />

                            <div className="drop-container" 
                                onDragOver={this.dragOver}
                                onDragEnter={this.dragEnter}
                                onDragLeave={this.dragLeave}
                                onDrop={this.handleFileDrop.bind(this)}
                            >
                                <input accept="image/*" type="file" id="file-avatar" hidden name="userAvatarInput" onChange={this.handleImageLoad.bind(this)}/>
                                <label className="file-input rounded sup-btn" htmlFor="file-avatar"><h2>Upload picture</h2></label>
                        
                                <div className="drop-message">
                                    <div className="upload-icon"></div>
                                </div>
                            </div>
                        </AccordionDetails>
                        <Divider />
                            <AccordionActions>
                                <Button onClick={this.handleDeleteImage} size="small" color="secondary">Delete</Button>
                                <Button onClick={this.handleSaveImage} size="small" color="primary">Save</Button>
                            </AccordionActions>
                    </Accordion>
                    
                    
                </div>
                <AddBtn></AddBtn>
            </div>
        )
    }
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
        onDeleteHeader: () => {
            dispatch({type : 'DELETE_HEADER', payload:null})
        },
        onChangeHeader: (data) => {
            dispatch({type : 'REDACT_HEADER', payload: data})
        },
        onAddDescription: () => {
            dispatch({type : 'ADD_DESCRIPTION', payload:null})
        },
        onDeleteDescription: () => {
            dispatch({type : 'DELETE_DESCRIPTION', payload:null})
        },
        onChangeDescription: (data) => {
            dispatch({type : 'REDACT_DESCRIPTION', payload: data})
        },
        onAddButton: () => {
            dispatch({type : 'ADD_BUTTON', payload:null})
        },
        onDeleteButton: (index) => {
            dispatch({type : 'DELETE_BUTTON', payload:index})
        },
        onChangeButton: (data, index) => {
            dispatch({type : 'REDACT_BUTTON', payload: {data, index}})
        },
        onChangeImage: (data) => {
            dispatch({type : 'REDACT_IMAGE', payload: data})
        },
        onChangeGeneralOptions: (data) => {
            dispatch({type : 'REDACT_GENERAL_OPTIONS', payload: data})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(optionsSide);
