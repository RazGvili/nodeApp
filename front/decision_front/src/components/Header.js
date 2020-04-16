import React, {useState, useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Timer from './timer'
import Skeleton from '@material-ui/lab/Skeleton';

import { Link, Redirect  } from 'react-router-dom'

import {ICONS} from './custom/IconsData'
import Icon from '@mdi/react'

import axios from "axios"
import {BASE_URL} from './GlobalVars'
import { useTracked  } from '../store'


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
    width:'60px',height:'60px',margin:'auto 5px'
  },
  toolbar:{
    display:'flex', justifyContent:'space-between',
    
  },
  appbar:{
    background:'none',
    boxShadow:'none',
    borderBottom:'4px grey'
  }
}))


export default function Header() {
  const classes = useStyles()
  const [state,dispatch] = useTracked()
  const {title,pros,cons,id,loading,isReadOnly} = state
  const [redirect,setRedirect] = useState(false)

  //todo:: put in global state, lets talk
  const Lockable = id.length < 23 ? true : false

  //console.log(pros[0])

  const handleLockClick = () => {
    dispatch({type: "TOGGLE_READ_ONLY"})
  }

  const handleDarkModeClick = () => {
    dispatch({type: "TOGGLE_DARK_MODE"})
  }

  async function handleSubmit() {
    console.log("handleSubmit")
    let decisionToSave = {
      desc:title,
      pros,
      cons
    }
    try {

        let res = null

        // existing decision
        if (id.length > 20) {
            res = await axios.patch(`${BASE_URL}/decisions/${id}`, decisionToSave)
            //todo:: why put the same object that was just saved? its already in the state
            //dispatch({type: "SAVE_DECISION_EDIT", payload: {decision: res.data}})
            setRedirect(true)
        // new decision
        } else {

            decisionToSave.isReadOnly = isReadOnly
            res = await axios.post(`${BASE_URL}/decisions`, decisionToSave)
            //todo:: why put the same object that was just saved? its already in the state
            dispatch({type: "SAVE_DECISION_NEW", payload: {decision: res.data}})
            setRedirect(true)
        }

        dispatch({type: "OPEN_SNACK", payload: {type: "success", text: "decision saved!"}})

    } catch (e) {
        console.error(e)

        dispatch({type: "OPEN_SNACK", payload: {type: "error", text: `Something went wrong. [${e}]`}})
        dispatch({type: "SET_ERROR", payload: {error:e.message}})

    }

}

return useMemo(() => {
  return (
    <div className={classes.root}>
      {redirect &&
                <Redirect to={{
                    pathname:`/d/${id}`,
                    state:{decisionFromState:true }
                }} />
      }
      {console.log("<--render header-->")}
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar} style={{}}>

        {/* Logo */}
        <Button component={Link} to="/">
        <img   src="/images/logo.png" alt="decisions" height="40px" />
        </Button>

        <div style={{display:'flex'}}>
          {loading ?
          <>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
          </>
          :
          <>
              
              { Lockable &&
              <IconButton onClick={handleLockClick} className={classes.roundButton}>
                <Icon
                    path={ICONS[isReadOnly ? 'ClosedLock':'OpenedLock' ]}
                    title="Save"
                    size={1.5}
                    color='#9A9A9A'
                />    
              </IconButton> 
              }
              
              <IconButton  onClick={() => handleSubmit()} className={classes.roundButton}>
                <Icon
                    path={ICONS['Save']}
                    title="Save"
                    size={1.5}
                    color='#9A9A9A'
                />    
              </IconButton>

              <IconButton className={classes.roundButton}>
                <Icon
                    path={ICONS['Share']}
                    title="Share"
                    size={1.5}
                    color='#9A9A9A'
                />    
              </IconButton>
              
              <IconButton  className={classes.roundButton}  onClick={handleDarkModeClick}>
                <Icon
                    path={ICONS['Theme']}
                    title="Share"
                    size={1.5}
                    color='#9A9A9A'
                />    
              </IconButton>
          </>
          }
          <Timer seconds="15"/>
          </div>
        </Toolbar>
      </AppBar>

      
    </div>
  )},[title,pros,cons,id,loading,isReadOnly,classes,redirect])
}

