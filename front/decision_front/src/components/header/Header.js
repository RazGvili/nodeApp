import React, {useState, useMemo, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar,Toolbar,Button,Typography,useMediaQuery, Menu, MenuItem,ListItemIcon,ListItemText} from '@material-ui/core'

//import Timer from '../timer'
import Skeleton from '@material-ui/lab/Skeleton';
import { Redirect  } from 'react-router-dom'

import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'

import axios from "axios"
import {BASE_URL} from '../../helpers/GlobalVars'
import { useTracked  } from '../../store'

import SaveButton from './SaveButton'
import ShowShare from './ShowShare'
import ShowHowItWorks from './ShowHowItWorks'

import {lang as texts} from '../../helpers/texts' 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  roundButton:{
    //backgroundColor:props=> props.success?'rgba(135, 186, 85, 0.75)':'inherit',
    width:'65px',
    height:'65px',
    margin:'auto 5px',
    display:'grid',
    textTransform:'none',
    borderRadius:'45px',
  },
  toolbar:{
    display:'flex',
    justifyContent:'space-between',
    padding:'15px 15px 0px 15px'
    
  },
  appbar:{
    background:'none',
    boxShadow:'none',
    borderBottom:'4px grey'
  },
  buttonText:{
    fontSize:'0.9em',
    fontWeight:600
  },
  logoButton:{
    textTransform:'none',
  }
}))


export default function Header({aboutVersion = false}) {
  const classes = useStyles()
  const [state,dispatch] = useTracked()
  const {title,pros,cons,id,loading,isReadOnly,isDark,lang} = state
  const [redirect,setRedirect] = useState(false)
  const [redirectHome,setRedirectHome] = useState(false)
  const smallScreen = useMediaQuery('(max-width:480px)');
  const smallERScreen = useMediaQuery('(max-width:420px)');
  //settings menu anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [saving,setSaving] = useState(false)
  const [showShare,setShowShare] = useState(false)
  const [showHowItWorks,setShowHowItWorks] = useState(false)
  const [savingSuccess,setSavingSuccess] = useState(false)
  const readOnlyMode = isReadOnly && id
  const isNewDecision = id ? false : true
  //console.log(id, isNewDecision)

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLockClick = () => {
    //todo:: check if it can be locked/unlocked
    dispatch({type: "TOGGLE_READ_ONLY"})

    if (isReadOnly) {
        dispatch({type: "OPEN_SNACK", payload: {type: "info", text: "[Opened mode] After the first save anyone with a link can edit this decision"}})
    } else {
        dispatch({type: "OPEN_SNACK", payload: {type: "info", text: "[Locked mode] After the first save no one(even you) can edit this decision "}})
    }

  }

  const handleDarkModeClick = () => {
    setAnchorEl(null);
    dispatch({type: "TOGGLE_DARK_MODE"})
  }

  const handleLanguageChange = (newLang) => {
    if (lang!==newLang){
      setAnchorEl(null);
      dispatch({type: "CHANGE_LANG", payload:{newLang:newLang}})
    }
  }

  const handleShare = () => {
    setShowShare(!showShare)
  }

  const handleHowItWorks = () => {
    setShowHowItWorks(!showHowItWorks)
  }
  
  async function handleSubmit() {

    //check if title is too short or empty
    //lang code = SNACKS_HEADER_TITLE_TEXT_VALIDATION
    if (title.length<3) {
      dispatch({type: "OPEN_SNACK", payload: {type: "error", text: "Title must be more than 2 characters"}})
    }
    else {
      setSaving(true)
      let decisionToSave = {
        desc:title,
        pros,
        cons
      }

      try {

          let res

          // existing decision
          if (!isNewDecision) {
              //todo:: handle empty title
              res = await axios.patch(`${BASE_URL}/decisions/${id}`, decisionToSave)
              //todo:: handle success and error?
              setSaving(false)
              setSavingSuccess(true)
              setTimeout(() => {
                setSavingSuccess(false)
              }, 3000);
              setRedirect(true)

          // new decision
          } else {
              //todo:: handle empty title
              decisionToSave.isReadOnly = isReadOnly
              res = await axios.post(`${BASE_URL}/decisions`, decisionToSave)
              dispatch({type: "SAVE_DECISION_NEW", payload: {decision: res.data}})
              setSaving(false)
              setSavingSuccess(true)
              setTimeout(() => {
                setSavingSuccess(false)
              }, 3000);
              setRedirect(true)
          }

          // lang code SNACKS_HEADER_DECISION_SAVED
          dispatch({type: "OPEN_SNACK", payload: {type: "success", text: "decision saved on our servers!"}})

      } catch (e) {
          console.error(e)
          setSaving(false)

          //lang code SNACKS_HEADER_DECISION_SAVE_ERR
          dispatch({type: "OPEN_SNACK", payload: {type: "error", text: `Something went wrong, We couldn't save your progress. [${e}]`}})
          dispatch({type: "SET_ERROR", payload: {error: e.message}})

      }
    }
  }

  useEffect(() => {
    
      if (redirectHome) {
        window.location.href = window.location.origin
      }
          
  }, [redirectHome])

return useMemo(() => {
  return (
    <div className={classes.root}>
      {console.log("<--render: header-->")}

      {redirect &&
                <Redirect to={{
                    pathname:`/d/${id}`,
                    state:{decisionFromState:true }
                }} />
      }
      
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar} >

        <Button onClick={aboutVersion?null:()=>setRedirectHome(true)} className={classes.logoButton}>
          <img src="/images/logo.png" alt="decisions" height="40px" />
          <Typography style={{fontFamily:'Permanent Marker,Varela Round',fontSize:smallScreen?'22px':'28px',paddingRight:'5px'}}>Decidy</Typography>
        </Button>

        <div style={{display:'flex'}}>

          {loading &!aboutVersion?
          <>
            <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
            <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
            <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
            <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
          </>
          :
          <>  
            <Button className={classes.roundButton} onClick={handleHowItWorks}>
              <Icon
                  path={ICONS['Question']}
                  title="How it works?"
                  size={smallScreen?0.7:1}
                  color='#9A9A9A'
                  style={{margin:'auto'}}
              />
              <Typography className={classes.buttonText}>
              {texts[lang]['HOW_TO']}
              </Typography>
            </Button>

            {!aboutVersion &&  !smallERScreen &&

              //   <Button onClick={handleLockClick} className={classes.roundButton}>
              //     <Icon
              //         path={ICONS[isReadOnly ? 'ClosedLock':'OpenedLock' ]}
              //         title="Lock"
              //         size={smallScreen?0.7:1}
              //         color='#9A9A9A'
              //         style={{margin:'auto'}}
              //     /> 
              //       <Typography className={classes.buttonText}>
              //       {isReadOnly ? 'Locked':'Open'   }
              //     </Typography>
              //   </Button> 
              // :
              <Button className={classes.roundButton} onClick={handleShare}>
                <Icon
                    path={ICONS['Share']}
                    title={texts[lang]['HEADER_SHARE_BUTTON']}
                    size={smallScreen?0.7:1}
                    color='#9A9A9A'
                    style={{margin:'auto'}}
                />
                <Typography className={classes.buttonText}>
                {texts[lang]['HEADER_SHARE_BUTTON']}
                 
                </Typography>
              </Button>
            }
              
            {!aboutVersion && !readOnlyMode &&
              <SaveButton saving={saving} lang={lang} success={savingSuccess} saveAction={handleSubmit} smallScreen={smallScreen}/>
            }
              
            {/* <Button  className={classes.roundButton}  onClick={handleDarkModeClick}>
              <Icon
                  path={ICONS['Theme']}
                  title="Toogle dark mode"
                  size={smallScreen?0.7:1}
                  color='#9A9A9A'
                  style={{margin:'auto'}}
              />
              <Typography className={classes.buttonText}>
              {isDark?'Dark':'Light'}
              </Typography>    
            </Button> */}

            <Button className={classes.roundButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}>
            <Icon
                  path={ICONS['Settings']}
                  title="Settings"
                  size={smallScreen?0.7:1}
                  color='#9A9A9A'
                  style={{margin:'auto'}}
              />
              <Typography className={classes.buttonText}>
              {texts[lang]['HEADER_SETTINGS']}
              </Typography>
            </Button>

                <Menu
              id="simple-menu"
              disableScrollLock
              anchorEl={anchorEl}
              keepMounted
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'left',
              // }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >

              {smallERScreen && !aboutVersion &&
              [
              !readOnlyMode &&
              <MenuItem onClick={handleSubmit} key="savemenu">         
                <Icon
                      path={ICONS['Save']}
                      title={texts[lang]['HEADER_SAVE_BUTTON']}
                      size={1}
                  />
                
                <span style={{paddingLeft:'5px'}}>
                {texts[lang]['HEADER_SAVE_BUTTON']}
                </span>
              </MenuItem>
            ,
              <MenuItem onClick={handleShare} key="sharemenu">         
              <Icon
                    path={ICONS['Share']}
                    title={texts[lang]['HEADER_SHARE_BUTTON']}
                    size={1}
                />
              
              <span style={{paddingLeft:'5px'}}>
              {texts[lang]['HEADER_SHARE_BUTTON']}
              </span>
            </MenuItem>
              
          ]
              }
            <MenuItem onClick={handleDarkModeClick} >         
              <Icon path={ICONS['Theme']} size={1} />
              
              <span style={{paddingLeft:'5px'}}>
                {isDark?texts[lang]['HEADER_DARK_MODE_BUTTON_DARK']:texts[lang]['HEADER_DARK_MODE_BUTTON_LIGHT']}
              </span>
            </MenuItem>

            <MenuItem onClick={()=> handleLanguageChange('heb')} >
            <img src='/images/lang/il.png' alt="heb" style={{width:'22px'}}/>
              <span style={{paddingLeft:'5px'}}>
              Hebrew
              </span>
            </MenuItem>
            <MenuItem onClick={()=> handleLanguageChange('eng')} >
            <img src='/images/lang/en.png' alt="eng" style={{width:'22px'}}/>
              <span style={{paddingLeft:'5px'}}>
              English
              </span>
            </MenuItem>
          </Menu>
          
          </>
          }
          {/* <Timer seconds="15"/> */}
          </div>
        </Toolbar>
      </AppBar>

      {showShare && <ShowShare isNewDecision={isNewDecision} lang={lang} closeAction={()=> setShowShare(false)}/>}

      {showHowItWorks && <ShowHowItWorks closeAction={()=> setShowHowItWorks(false)} lang={lang}/>}
      
      
    </div>
  )},
  [
    title,
    pros,
    cons,
    id,
    lang,
    loading,
    isReadOnly,
    classes,
    redirect,
    redirectHome,
    showShare,
    saving,
    savingSuccess,
    isDark,
    isNewDecision,
    smallScreen,
    showHowItWorks,
    anchorEl
  ]

)}