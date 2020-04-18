
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTracked  } from '../../store'
import Paper from '@material-ui/core/Paper'
import {green} from '../GlobalVars'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Typography, IconButton } from '@material-ui/core'
import Icon from '@mdi/react'
import { ICONS } from '../custom/IconsData'

const useStyles = makeStyles((theme) => ({
    copyButton:{
    background:'none',
    textTransform:'none',
    paddingRight:'20px',
    borderRadius: '45px',
    width:'200px',
    border: '1px grey solid',
    '&:hover':{
      background:green,
      border: '1px green solid',
    }
    },
    closeIcon:{
      position:'absolute',
      right:'15px',
      top:'10px'
    }
  }));


export default function ShowShare({closeAction}) {
    const classes = useStyles();

    const [ state, dispatch ] = useTracked()
    const [ copied, setCopied ] = useState(false)

    let id = state.id

    useEffect(() => {
    
        if (copied) {
          setTimeout( () => setCopied(false), 3000 )
        }
            
    }, [copied])
    
    return (
        <div style={{background:'rgba(0, 0, 0, 0.1)',padding:'15px',position:'relative'}}>
          <IconButton onClick={closeAction} className={classes.closeIcon}>
            <Icon path={ICONS['Close']} size={1} />
          </IconButton>
                
                <Typography> Get some feedback! <br/> Copy your decision link and share </Typography> 

                <br/>

                <CopyToClipboard text={id}
                    onCopy={() => setCopied(true)}>
                    <Button className={classes.copyButton} endIcon={<Icon path={ICONS['Copy']} size={0.7} color="rgba(0, 0, 0, 0.3)"/>}>
                      <Typography style={{width:'100%'}}>
                      {copied? 'Copied!' : 'Copy to clipboard'}
                        
                      </Typography>
        
                      </Button>
                </CopyToClipboard>

                
            <br/>
        </div>
    )
}