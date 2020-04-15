import React, {useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
//import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Timer from './timer'
import Skeleton from '@material-ui/lab/Skeleton';

import { Link  } from 'react-router-dom'

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


export default function Header({loading,showLock, isReadOnly, setIsReadOnly}) {
  const classes = useStyles()
  const [state,dispatch] = useTracked()

  let desc = state.title
  let pros = [...state.pros]
  let cons = [...state.cons]

  let decisionToSave = {
    desc,
    pros,
    cons
  }

  const handleDarkModeClick = () => {
    dispatch({type: "TOGGLE_DARK_MODE"})
  }

  useEffect(() => {

    if (isReadOnly) {

        console.log("isReadOnly: " + isReadOnly) 
        dispatch({type: "OPEN_SNACK", payload: {type: "info", text: `[${isReadOnly ? "LOCKED" : "UNLOCKED"}] If locked, the board will be read-only after save & share`}})
    }
  }, [isReadOnly])


  async function handleSubmit() {
    console.log("handleSubmit")

    try {

        let res = null

        // existing decision
        if (state.id.length > 20) {
            res = await axios.patch(`${BASE_URL}/decisions/${state.id}`, decisionToSave)
            dispatch({type: "SAVE_DECISION_EDIT", payload: {decision: res.data}})

        // new decision
        } else {

            // todo --> isReadOnly should be a hook here
            decisionToSave.isReadOnly = false
            res = await axios.post(`${BASE_URL}/decisions`, decisionToSave)
            dispatch({type: "SAVE_DECISION_NEW", payload: {decision: res.data}})
        }

        dispatch({type: "OPEN_SNACK", payload: {type: "success", text: "decision saved!"}})

    } catch (e) {
        console.error(e)

        dispatch({type: "OPEN_SNACK", payload: {type: "error", text: `Something went wrong. [${e}]`}})
        dispatch({type: "SET_ERROR", payload: {error:e.message}})

    }
    
    // console.log("===")
    // console.log(state)
    // console.log("===")
}


  return (
    <div className={classes.root}>
      {console.log("<--render: header-->")}
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar} style={{}}>

        {/* Logo */}
        <Button component={Link} to="/">
        <img   src="/images/logo.png" alt="decisions" height="40px" />
        </Button>

        {/* <Button component={Link} to="/About"> About </Button> */}
        <div style={{display:'flex'}}>
          {loading ?
          <>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
          </>
          :
          <>
              
              { showLock &&
              <IconButton onClick={() => setIsReadOnly(!isReadOnly)} className={classes.roundButton}>
                <Icon
                    path={ICONS[!isReadOnly ? 'OpenedLock' : 'ClosedLock']}
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
  )
}

