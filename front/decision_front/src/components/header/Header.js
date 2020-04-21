import React, {useState, useMemo, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar,Toolbar,Button,Typography} from '@material-ui/core'

//import Timer from '../timer'
import Skeleton from '@material-ui/lab/Skeleton';
import { Redirect  } from 'react-router-dom'

import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'

import axios from "axios"
import {BASE_URL} from '../GlobalVars'
import { useTracked  } from '../../store'

import SaveButton from './SaveButton'
import ShowShare from './ShowShare'


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
    display:'flex', justifyContent:'space-between',padding:'15px 15px 0px 15px'
    
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
  const {title,pros,cons,id,loading,isReadOnly,isDark} = state
  const [redirect,setRedirect] = useState(false)
  const [redirectHome,setRedirectHome] = useState(false)

  const [saving,setSaving] = useState(false)
  const [showShare,setShowShare] = useState(false)
  const [savingSuccess,setSavingSuccess] = useState(false)

  const isNewDecision = id ? false : true

  const handleLockClick = () => {
    //todo:: check if it can be locked/unlocked
    dispatch({type: "TOGGLE_READ_ONLY"})

    if (isReadOnly) {
        dispatch({type: "OPEN_SNACK", payload: {type: "info", text: "[Editable mode] After the first save, this decision will be editable for all users who have the unique link"}})
    } else {
        dispatch({type: "OPEN_SNACK", payload: {type: "info", text: "[Read-only mode] After the first save, this decision will be read-only for all (even you)"}})
    }
  }

  const handleDarkModeClick = () => {
    dispatch({type: "TOGGLE_DARK_MODE"})
  }

  const handleShare = () => {
    setShowShare(!showShare)
  }
  
  async function handleSubmit() {

    //check if title is too short or empty
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

          dispatch({type: "OPEN_SNACK", payload: {type: "success", text: "decision saved!"}})

      } catch (e) {
          console.error(e)
          setSaving(false)
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
        <Toolbar className={classes.toolbar} style={{}}>

        <Button onClick={()=>setRedirectHome(true)} className={classes.logoButton}>
          <img src="/images/logo.png" alt="decisions" height="40px" />
          <Typography style={{fontFamily:'Permanent Marker',fontSize:'28px',paddingRight:'5px'}}>Decidy</Typography>
        </Button>

        <div style={{display:'flex'}}>
          {loading &!aboutVersion?
          <>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
          </>
          :
          <>
              
              {!aboutVersion && ( isNewDecision?
                <Button onClick={handleLockClick} className={classes.roundButton}>
                  <Icon
                      path={ICONS[isReadOnly ? 'ClosedLock':'OpenedLock' ]}
                      title="Lock"
                      size={1}
                      color='#9A9A9A'
                      style={{margin:'auto'}}
                  /> 
                   <Typography className={classes.buttonText}>
                   {isReadOnly ? 'Locked':'Open'   }
                  </Typography>
                </Button> 
              :
                <Button className={classes.roundButton} onClick={handleShare}>
                  <Icon
                      path={ICONS['Share']}
                      title="Share"
                      size={1}
                      color='#9A9A9A'
                      style={{margin:'auto'}}
                  />
                  <Typography className={classes.buttonText}>
                  Share 
                  </Typography>
                </Button>
              )}
              
              {!aboutVersion && !isReadOnly &&
                <SaveButton saving={saving} success={savingSuccess} saveAction={handleSubmit} />
              }
              
              <Button  className={classes.roundButton}  onClick={handleDarkModeClick}>
                <Icon
                    path={ICONS['Theme']}
                    title="Toogle dark mode"
                    size={1}
                    color='#9A9A9A'
                    style={{margin:'auto'}}
                />
                <Typography className={classes.buttonText}>
                {isDark?'Dark':'Light'}
                </Typography>    
              </Button>
          </>
          }
          {/* <Timer seconds="15"/> */}
          </div>
        </Toolbar>
      </AppBar>

      {showShare && <ShowShare closeAction={()=> setShowShare(false)}/>}

      
    </div>
  )},[title,pros,cons,id,loading,isReadOnly,classes,redirect,redirectHome, showShare,saving,savingSuccess,isDark,isNewDecision])
}