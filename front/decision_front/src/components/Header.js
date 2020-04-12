import React from 'react'
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
  }
}))


export default function Header({handleSubmit,loading}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>

        {/* Logo */}
        <Button component={Link} to="/">
        <img   src="/images/logo.png" alt="decisions" height="40px" />
        </Button>

        {/* <Button component={Link} to="/About"> About </Button> */}
        <div style={{display:'flex'}}>
          {loading?
          <>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>
                      <Skeleton animation="wave" variant="circle" className={classes.roundButton}/>

          </>
          :
          <>
        <IconButton  onClick={() => handleSubmit()} className={classes.roundButton}>
            <Icon
                path={ICONS['Save']}
                title="Save"
                size={1.5}
                color='#9A9A9A'
            />    
          </IconButton>

          <IconButton  onClick={() => {handleSubmit()}} className={classes.roundButton}style={{width:'60px',height:'60px',margin:'auto'}}>
            <Icon
                path={ICONS['Share']}
                title="Share"
                size={1.5}
                color='#9A9A9A'
            />    
          </IconButton>
          </>}
          <Timer seconds="15"/>
          </div>
        </Toolbar>
      </AppBar>

      
    </div>
  )
}