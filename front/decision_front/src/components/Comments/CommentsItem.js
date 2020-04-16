import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

//import ListItem from '@material-ui/core/ListItem'
//import ListItemText from '@material-ui/core/ListItemText'

//import FaceIcon from '@material-ui/icons/Face'
//import ListItemIcon from '@material-ui/core/ListItemIcon'
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'

//import Typography from '@material-ui/core/Typography'



import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'
import Avatar from '../custom/Avatar'
import { Grid, Typography } from '@material-ui/core'

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '460px',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    container:{
        display:'flex'
    },
    bubbleContainer:{
        float: 'left',
  width: '100%',
  marginBottom: '1em',
    },
    BubbleText:{
    boxSizing: 'border-box',
    float: 'left',
    width: '100%',
    backgroundColor: '#C0CAD4',
	borderRadius: '45px',
	display: 'inline-block',
	marginBottom: '2em',
	padding: '1em',
	position: 'relative',

    },
    tail:{
    height: '25px',
    width: '25px',
    background: '#C0CAD4',
    position: 'absolute',
    left: '-9px',
    top: '10px',
    borderRadius: '50%',
    '&:before':{
      height: '12px',
      width: '12px',
      background: '#C0CAD4',
      content: `''`,
      display: 'block',
      borderRadius: '50%',
      position: 'absolute',
      left: '-10px',
      bottom: '-4px',
    }
    },
    name:{
        color:theme.palette.type==='light'?'black':'white',
        fontWeight:'700',
                    position: 'absolute',
                    left: '0px',
                    width: '60px',
                    top: '65px',
                    fontSize: '11px'
    }
    
}))


export default function Comments({comment, setRemoveLastOne,canDelete}) {
    const classes = useStyles()

    let commentData = comment
    //todo change date string to how long ago

    return (

        <div className={classes.container}>
            <Grid container>
                <Grid item xs={2} style={{position:'relative'}}>
                    <Avatar />
                    <Typography className={classes.name}>
                    {commentData.name}
                        </Typography> 
                    
                </Grid>

                <Grid item xs={10} style={{textAlign:'left',padding:'10px 10px 0px'}} >
                    <div className={classes.bubbleContainer}>
                    <div className={classes.BubbleText}>
                    <b>{commentData.text}</b><br />
                    <Typography style={{color:'grey',fontSize:'12px'}}>
                    {timeSince(new Date(commentData.date))} ago
                    </Typography>
                    <div className={classes.tail} />
                    </div>
                    </div>
                </Grid>                
            </Grid>
            { canDelete && 
                    
                    <IconButton  onClick={()=>setRemoveLastOne()} style={{
                        position: 'absolute',
                        right: '10px',
                        bottom: '70px',
                        }}>
                        <Icon   
                            path={ICONS['Remove']}
                            title="Save"
                            size={0.9}
                        />
                    </IconButton>
                
            }
        </div>
    )
}   