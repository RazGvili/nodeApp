import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress,IconButton, Button } from '@material-ui/core'
import {ICONS} from '../../custom/IconsData'
import Icon from '@mdi/react'


const useStyles = makeStyles((theme) => ({
    roundButton:{
        width:'60px',
        height:'60px',
        margin:'auto 5px',
        display:'grid',
        textTransform:'none',
        borderRadius:'45px',
      },
}))


export default function SaveButton({loading, success,saveAction}) {
    const classes = useStyles()
    return (
        <Button     onClick={loading?null:() => saveAction()}
                        className={classes.roundButton}
                        style={{backgroundColor:success?'rgba(135, 186, 85, 0.75)':'none'}}>
                {loading?
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
                {!success && 'Save'}
                </>
                }

              </Button>
    )
}   