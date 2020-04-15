import React, {useMemo} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { useTrackedState,useDispatch } from '../../store'

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
    //const classes = useStyles()
    const dispatch = useDispatch();
    const state = useTrackedState();
    let {showSnack,snackType,snackText} = state
     // Store ----------------------------------------
    //const context = useContext(store)
    //const { dispatch } = context
    //const { Consumer } = store
     // ----------------------------------------------    


    const handleClose = () => {
        dispatch({type: "CLOSE_SNACK"})
    }
    
    return useMemo(() => {
    return (
                    <Snackbar 
                        open={showSnack}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        
                        <Alert 
                            severity={snackType} 
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                        <Icon path={ICONS['Close']} title="Close" size={1} />
                                    </IconButton>
                                </React.Fragment>
                            }
                        >
                            {console.log('snack render')}
                            {snackText}
                        </Alert>
                    </Snackbar>                    
    )},[showSnack,snackType,snackText])
}