import React, {useMemo} from 'react'
//import { withStyles } from '@material-ui/core/styles'
import { useTrackedState,useDispatch } from '../../store'
import {IconButton,Slide,Snackbar} from '@material-ui/core'
import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'
import { red,green } from '../GlobalVars'
import Alert from '@material-ui/lab/Alert'

const SlideTransition = (props) =>  <Slide {...props} direction="down" />


export default function Snack() {
    //const classes = useStyles()
    const dispatch = useDispatch();
    const state = useTrackedState();
    let {showSnack,snackType,snackText} = state

    const handleClose = () => {
        dispatch({type: "CLOSE_SNACK"})
    }

    return useMemo(() => {
    return (
                    <Snackbar 
                        TransitionComponent={SlideTransition}
                        open={showSnack}
                        anchorOrigin={{ vertical:'top', horizontal: 'center'}}
                        autoHideDuration={10000}
                        onClose={handleClose}
                    >
                        <div>
                            <Alert 
                                severity={snackType} 
                                color={snackType}
                                elevation={6}
                                variant="filled"
                                style={{background:snackType==='error'?red:green}}
                                action={
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                        <Icon path={ICONS['Close']} title="Close" size={1} />
                                        {console.log('<--render: snack-->')} 
                                    </IconButton>
                                }
                                
                            >
                                {snackText}
                            </Alert>
                        </div>
                    </Snackbar>              
    )},[showSnack,snackType,snackText])
}