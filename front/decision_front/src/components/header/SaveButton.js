import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Button, Typography } from '@material-ui/core'
import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'
import {lang as texts} from '../../helpers/texts'

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


export default function SaveButton({saving, success,saveAction,smallScreen,lang}) {
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
                    title={texts[lang]['HEADER_SAVE_BUTTON']}
                    size={smallScreen?0.7:1}
                    color={success?'white':'#9A9A9A'}
                />
                    <Typography className={classes.buttonText}>
                    {success?texts[lang]['HEADER_SAVED_BUTTON'] :texts[lang]['HEADER_SAVE_BUTTON']}
                    </Typography>
                </>
                }

              </Button>
    )
}   