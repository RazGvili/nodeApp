
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTrackedState  } from '../../store'
import {green} from '../../helpers/GlobalVars'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Typography, IconButton, Grid, useTheme } from '@material-ui/core'
import Icon from '@mdi/react'
import { ICONS } from '../custom/IconsData'
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareCount,
  RedditShareCount,
  EmailShareButton,
  FacebookMessengerShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookMessengerIcon
} from "react-share";

import {lang as texts} from '../../helpers/texts'

const useStyles = makeStyles((theme) => ({
    root:{
      color:theme.palette.type==='dark'?'white':'black',
      background:'rgba(0, 0, 0, 0.1)',
      padding:'15px',
      position:'relative',
    },
    copyButton:{
    background:'none',
    textTransform:'none',
    paddingRight:'20px',
    margin:'10px',
    borderRadius: '45px',
    width:'285px',
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


export default function ShowShare({isNewDecision, closeAction}) {
    const classes = useStyles()
    const theme = useTheme()
    const state = useTrackedState()
    const [ copied, setCopied ] = useState(false)
    let lang = state.lang
    let id = state.id
    const shareAdress = `https://deciidy.web.app/d/${id}`
    const handleCopied = () => {
      setCopied(true)
      setTimeout( () => setCopied(false), 3000 )
    }

    return (
        <div className={classes.root}>

          <IconButton onClick={closeAction} className={classes.closeIcon}>
            <Icon path={ICONS['Close']} size={1} />
          </IconButton>
                
            { !isNewDecision ?
            
              <> 
                <Typography>
                  {texts[lang]['SHARE_POPUP_EXPLAINER_FIRST_ROW']}
                  <br/>
                  {texts[lang]['SHARE_POPUP_EXPLAINER_SECOND_ROW']}
                </Typography> 
                <br/>

                <Grid container style={{maxWidth:'500px',margin:'auto'}} spacing={2} justify='center'>

                  <Grid item xs={3} sm={1} >
                    <FacebookShareButton quote="Productive and simple decision making with Decidy." hashtag="#DecisionMaking" url={shareAdress}>
                      <FacebookIcon round  size={32}/>
                    </FacebookShareButton>
                    <br />
                    <FacebookShareCount url={shareAdress} >
                      {shareCount => <span>{shareCount}</span>}
                    </FacebookShareCount> 
                  </Grid> 

                  {/* <Grid item xs={3} sm={1} >
                    <FacebookMessengerShareButton
                      url={shareAdress}
                      title="Productive and simple decision making with Decidy."
                      appId="232695234491730"
                    >
                      <FacebookMessengerIcon size={32} round />
                    </FacebookMessengerShareButton>
                  </Grid> */}

                  <Grid item xs={3} sm={1} >
                    <LinkedinShareButton title="Productive and simple decision making with Decidy." summary="See your decision" source="Decidy"
                    url={shareAdress} >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </Grid>

                  {/* <Grid item xs={3} sm={1} >
                    <RedditShareButton title="See your decision" url={shareAdress} >
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                    <RedditShareCount url={shareAdress} >
                    {shareCount => <span>{shareCount}</span>}
                    </RedditShareCount>
                  </Grid> */}

                  <Grid item xs={3} sm={1} >
                    <EmailShareButton subject="Pros & Cons of my decision" body={"Link to my decision " + shareAdress} separator=" | ">
                      <EmailIcon size={32} round/>
                    </EmailShareButton>
                  </Grid>

                  {/* <Grid item xs={3} sm={1} >
                  <TwitterShareButton title="My Decision" via="Decidy" hashtags={['Decision making', 'pros', 'cons','decision visualization', 'decisions']}
                  //related={[]}
                  url={shareAdress} >
                    <TwitterIcon round size={32} />
                    </TwitterShareButton>
                  </Grid> */}

                  <Grid item xs={3} sm={1} >
                  <WhatsappShareButton title="Pros & Cons of my decision:" url={shareAdress} >
                    <WhatsappIcon round size={32} />
                    </WhatsappShareButton>
                  </Grid>
                </Grid> 

              <br />

              <div style={{display:'flex',justifyContent:'center'}}>
                <CopyToClipboard text={shareAdress}
                  onCopy={handleCopied}>
                  <Button className={classes.copyButton} endIcon={<Icon path={ICONS['Copy']} size={0.9} color={theme.palette.type==='dark'?'white':'black'}/>}>
                    <Typography style={{width:'100%'}}>
                      {copied? texts[lang]['COPIED'] : texts[lang]['SHARE_POPUP_EXPLAINER_SECOND_ROW']}
                    </Typography>
                  </Button>
                </CopyToClipboard>
                {/* <WhatsappShareButton title="Pros & Cons of my decision:" url={shareAdress} >
                  <WhatsappIcon round size={40} />
                </WhatsappShareButton> */}
              </div>

            </> 
            :
            <>
              <Typography>{texts[lang]['SHARE_FIRST']}</Typography> 
            </>
            }
        </div>
    )
}