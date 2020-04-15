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
import { Grid } from '@material-ui/core'



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
    }
}))


export default function Comments({comment, setRemoveLastOne}) {
    const classes = useStyles()

    let commentData = comment
    //todo change date string to how long ago

    return (

        <div className={classes.container}>
            <Grid container>
                <Grid item xs={2}>
                    {/* <Avatar />  */}    
                </Grid>

                <Grid item xs={10}>
                    <b>{commentData.text}</b>
                    <br />
                    <span>
                    {commentData.name} <br />
                    {commentData.date}
                    </span>
                </Grid>                
            </Grid>
            { setRemoveLastOne && 
                    
                    <IconButton  onClick={()=>{setRemoveLastOne()}}>
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