import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import FaceIcon from '@material-ui/icons/Face'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'



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


export default function Comments(comment) {
    const classes = useStyles()

    let commentData = comment.comment

    return (

        <div>

            <ListItem alignItems="flex-start">

                <ListItemIcon>
                    <FaceIcon />    
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

            </ListItem>

        </div>
    )
}