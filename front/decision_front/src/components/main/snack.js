import React, {useContext} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { store } from '../../store'

import IconButton from '@material-ui/core/IconButton'

import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}))

export default function Snack() {
    const classes = useStyles()

     // Store ----------------------------------------
    const context = useContext(store)
    const { dispatch } = context
    const { Consumer } = store
     // ----------------------------------------------    


    const handleClose = () => {
        dispatch({type: "CLOSE_SNACK"})
    }

    return (
        <div className={classes.root}>
            <Consumer>
                {val => 
                    <Snackbar 
                        open={val.state.showSnack}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert 
                            severity={val.state.snackType} 
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                        <Icon path={ICONS['Close']} title="Close" size={1} />
                                    </IconButton>
                                </React.Fragment>
                            }
                        >
                            {val.state.snackText}
                        </Alert>
                    </Snackbar>                    
                }
            </Consumer>
        </div>
    )
}