import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
//import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Timer from './timer'

import { Link  } from 'react-router-dom'

import {ICONS} from './custom/IconsData'
import Icon from '@mdi/react'
import Typography from 'material-ui/styles/typography'

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
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>

        {/* Logo */}
        <div>
        <Button  component={Link} to="/"> logo </Button> name
        </div>
        {/* <Button component={Link} to="/About"> About </Button> */}
        <div style={{display:'flex'}}>
        <IconButton  onClick={() => {handleSubmit()}}>
            <Icon
                path={ICONS['Save']}
                title="Save"
                size={1.5}
                color='#9A9A9A'
            />    
          </IconButton>

          <IconButton  onClick={() => {handleSubmit()}}>
            <Icon
                path={ICONS['Share']}
                title="Share"
                size={1.5}
                color='#9A9A9A'
            />    
          </IconButton>
  
          <Timer seconds="15"/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}