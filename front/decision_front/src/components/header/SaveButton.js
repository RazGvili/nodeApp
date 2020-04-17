import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress,IconButton, Button, Typography } from '@material-ui/core'
import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'


const useStyles = makeStyles((theme) => ({
    roundButton:{
        backgroundColor:props=> props.success?'rgba(135, 186, 85, 0.75)':'inherit',
        width:'65px',
        height:'65px',
        margin:'auto 5px',
        display:'grid',
        textTransform:'none',
        borderRadius:'45px',
      },
      buttonText:{
        fontSize:'0.9em',
        fontWeight:600
      }
}))


export default function SaveButton({saving, success,saveAction}) {
    const classes = useStyles({saving,success})
    return (
        <Button onClick={ (saving||success) ?null:() => saveAction()}
                        className={classes.roundButton}>
                {saving?
                <CircularProgress size={26} style={{color:'#2196F3'}} thickness={7}/>
                :
                <>
                <Icon
                    style={{margin:'auto'}}
                    path={ICONS[success?'Check':'Save']}
                    title="Save"
                    size={1}
                    color={success?'white':'#9A9A9A'}
                />
                {!success &&
                    <Typography className={classes.buttonText}>
                    Save
                    </Typography>
                }
                </>
                }

              </Button>
    )
}   