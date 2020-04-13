import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import FaceIcon from '@material-ui/icons/Face'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'

import Typography from '@material-ui/core/Typography'



import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'
import Avatar from '../custom/Avatar'



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    }

}))


export default function Comments({comment, lastOne, setRemoveLastOne}) {
    const classes = useStyles()

    let commentData = comment

    return (

        <div>

            <ListItem alignItems="flex-start">

                <ListItemIcon>
                    {/* <Avatar />    */}
                </ListItemIcon>

                <ListItemText
                    primary={<b>{commentData.title}</b>}

                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {commentData.name + " - "}
                            </Typography>
                                {commentData.text} <br/>
                                {commentData.date}
                        </React.Fragment>
                    }

                />                       

                { lastOne && 
                    <ListItemSecondaryAction>
                        <IconButton  onClick={()=>{setRemoveLastOne(true)}}>
                            <Icon   
                                path={ICONS['Remove']}
                                title="Save"
                                size={0.9}
                            />
                        </IconButton>
                    </ListItemSecondaryAction>
                }

            </ListItem>

        </div>
    )
}   