import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
//import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Timer from './Timer'

import { NavLink  } from 'react-router-dom'

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
}))


export default function Header({handleSubmit}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

        {/* Logo */}
        <Button component={NavLink} to="/"> Home </Button>

        <Button component={NavLink} to="/About"> About </Button>

        <IconButton edge="start" onClick={() => {handleSubmit()}}>
            <Icon
                path={ICONS['Save']}
                title="Save"
                size={1}
            />    
          </IconButton>
  
          
          <Timer seconds="15"/>
        </Toolbar>
      </AppBar>
    </div>
  )
}