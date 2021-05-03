import React from 'react';
import { connect } from 'react-redux'
import clsx from 'clsx';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: props => ({
        width: Number(props.contentWidth),
        height: Number(props.contentHeight)
    }),
    media: props => ({
        minWidth:'100%',
        width: Number(props.imageWidth),
        height: Number(props.imageHeight),
    }), 
    nullifyPadding:{
        padding:0
    },
    flex:{
        display:'flex'
    },
    rowReverse:{
        flexDirection:'row-reverse'
    },
    columnReverse:{
        display:'flex',
        flexDirection:'column-reverse'
    }
});


function MainCard({optionsState}) {
    const classes = useStyles(optionsState.generalOptions?.styles);
    console.log(classes)
    const ContentActionArea = optionsState.generalOptions?.contentActive ? CardActionArea : Box
    const ImageActionArea = optionsState.generalOptions?.imageActive ? CardActionArea : Box
    
    return (
        <Card className={classes.root}>
            <ContentActionArea className={clsx(
                classes.nullifyPadding,
                optionsState.generalOptions?.contentFlex ? classes.flex : '',
                optionsState.generalOptions?.contentInvert ? 
                optionsState.generalOptions?.contentFlex ? classes.rowReverse : classes.columnReverse : '',
            )}>
                {optionsState.image ?
                    <ImageActionArea >
                        <CardMedia
                            className={classes.media}
                            image={optionsState.image}
                        />
                    </ImageActionArea>
                : ''}
                <CardContent>
                    {optionsState.header ?
                    <Typography gutterBottom variant="h5" component="h2">
                        {optionsState.header.value}
                    </Typography>
                    : ''}

                    {optionsState.description ?
                    <Typography variant="body2" color="textSecondary" component="p">
                        {optionsState.description.value}
                    </Typography>
                    : ''}
                </CardContent>
                
            </ContentActionArea>
            {optionsState.buttons ?
                <CardActions>
                    {optionsState.buttons.map((item, index)=>{
                        return <Button key={index} size="small" color="primary">
                            {item.value}
                        </Button>
                    })}
                </CardActions>
                : ''}
        </Card>
    );
}

const mapStateToProps = (state) =>{
    return {
        optionsState:state.options
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCard);