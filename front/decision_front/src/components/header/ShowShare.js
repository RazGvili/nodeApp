
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTrackedState  } from '../../store'
import {green} from '../GlobalVars'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Typography, IconButton } from '@material-ui/core'
import Icon from '@mdi/react'
import { ICONS } from '../custom/IconsData'
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareCount,
  RedditShareCount
} from "react-share";
const useStyles = makeStyles((theme) => ({
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
      position:'absolute',
      right:'15px',
      top:'10px'
    }
  }));


export default function ShowShare({closeAction}) {
    const classes = useStyles();

    const state = useTrackedState()
    const [ copied, setCopied ] = useState(false)

    let id = state.id

    const handleCopied = () => {
      setCopied(true)
      setTimeout( () => setCopied(false), 3000 )
    }

    
    return (
        <div style={{background:'rgba(0, 0, 0, 0.1)',padding:'15px',position:'relative'}}>
          <IconButton onClick={closeAction} className={classes.closeIcon}>
            <Icon path={ICONS['Close']} size={1} />
          </IconButton>
                
                <Typography> Get feedback by sharing with others  </Typography> 

                <br/>
                <FacebookShareButton quote="text here" hashtag="hashtag todo" url="" />
                <FacebookShareCount url={""} />

                <LinkedinShareButton title="" summary="" source="Decidy" url="http://test.com"/>
                <RedditShareButton title="" url="" />
                <RedditShareCount url={""} />
                <TwitterShareButton title="" via="Decidy" hashtags={[]} related={[]} url="" />
                <WhatsappShareButton title="" url="" />

                <CopyToClipboard text={window.location.origin + "/d/" + id}
                    onCopy={handleCopied}>
                    <Button className={classes.copyButton} endIcon={<Icon path={ICONS['Copy']} size={0.7} color="rgba(0, 0, 0, 0.3)"/>}>
                      <Typography style={{width:'100%'}}>
                      {copied? 'Copied!' : 'Copy link to clipboard'}
                        
                      </Typography>
        
                      </Button>
                </CopyToClipboard>

                
            <br/>
        </div>
    )
}