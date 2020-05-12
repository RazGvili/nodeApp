import React, {useMemo} from 'react'
//import { withStyles } from '@material-ui/core/styles'
import { useTrackedState,useDispatch } from '../../store'
import {IconButton,Slide,Snackbar,Button} from '@material-ui/core'
import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'
import { red,green } from '../../helpers/GlobalVars'
import Alert from '@material-ui/lab/Alert'

const SlideTransition = (props) =>  <Slide {...props} direction="down" />


export default function Snack() {
    //const classes = useStyles()
    const dispatch = useDispatch();
    const state = useTrackedState();
    let {showSnack,snackType,snackText,snackAdditionalInfo} = state

    const handleClose = () => {
        if(showSnack) {dispatch({type: "CLOSE_SNACK"})}
    }

    const handleUndo = () => {
        dispatch({type: "UNDO_ARG_REMOVE"})
        handleClose()
    }

    return useMemo(() => {
    return (
                    <Snackbar 
                        TransitionComponent={SlideTransition}
                        open={showSnack}
                        anchorOrigin={{ vertical:'top', horizontal: 'center'}}
                        autoHideDuration={15000}
                        onClose={handleClose}
                    >
                        <div>
                            <Alert 
                                severity={snackType} 
                                color={snackType}
                                elevation={6}
                                variant="filled"
                                style={{background: snackType==='error'?red:green}}
                                action={
                                    <>
                                        {
                                            snackAdditionalInfo === 'remove' && 
                                                <Button style={{backgroundColor: "#00000024"}} variant="contained"  size="small" onClick={handleUndo}>
                                                    Undo
                                                </Button>
                                        }
                                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                            <Icon path={ICONS['Close']} title="Close" size={1} />
                                            {console.log('<--render: snack-->')} 
                                        </IconButton>
                                    </>
                                }
                                
                            >
                                {snackText}
                            </Alert>
                        </div>
                    </Snackbar>              
    )},[showSnack,snackType,snackText,snackAdditionalInfo])
}