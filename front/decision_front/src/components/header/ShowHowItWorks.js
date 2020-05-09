import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {green} from '../../helpers/GlobalVars'
import { IconButton, useTheme } from '@material-ui/core'
import Icon from '@mdi/react'
import { ICONS } from '../custom/IconsData'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({

    root:{
        color:theme.palette.type==='dark'?'white':'black',
        background:'rgba(0, 0, 0, 0.1)',
        padding:'15px',
        position:'relative'
    },
    copyButton:{
        background:'none',
        textTransform:'none',
        paddingRight:'20px',
        borderRadius: '45px',
        width:'200px',
        border: '1px grey solid',
        '&:hover':{
        background:'rgba(135, 185, 85, 0.5)',
        border: `${green} solid 1px`,
        }
    },
    closeIcon:{
        //position:'absolute',
        right:'15px',
        top:'10px'
    }
}));


export default function ShowHowItWorks({closeAction}) {
    const classes = useStyles()
    const theme = useTheme()
    
    return (

        <div className={classes.root}>

            <IconButton onClick={closeAction} className={classes.closeIcon}>
                <Icon path={ICONS['Close']} size={1} />
            </IconButton>

            <List component="nav">
                <ListItem >
                    <ListItemIcon>
                        <Icon path={ICONS['QuestionHead']} size={1} />
                    </ListItemIcon>
                    <ListItemText primary={`Write down your yes/no question, like "Should i get a dog?"`} />
                </ListItem>

                <ListItem >
                    <ListItemIcon>
                        <Icon path={ICONS['PlusOutline']} size={1} />
                    </ListItemIcon>
                    <ListItemText primary="Add & rate your pros/cons." />
                </ListItem>

                <ListItem >
                    <ListItemIcon>
                        <Icon path={ICONS['Save']} size={1} />
                    </ListItemIcon>
                    <ListItemText primary="Save your progress and get a link for easy access." />
                </ListItem>

                <ListItem >
                    <ListItemIcon>
                        <Icon path={ICONS['Share']} size={1} />
                    </ListItemIcon>
                    <ListItemText primary="Get feedback by sharing with your wise friends." />
                </ListItem>

            </List>
            
            <br/>

        </div>
    )
}