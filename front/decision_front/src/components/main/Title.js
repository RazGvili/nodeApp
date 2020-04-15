
import React from "react"

import {makeStyles,useTheme} from "@material-ui/core/styles"
import { InputBase} from '@material-ui/core'

import { useTracked } from '../../store'

const useStyles = makeStyles(theme => ({
    inputRoot:{
        color:theme.palette.type==='dark'?'white':'black',
        width:'95%',
        maxWidth:'1000px',
        borderRadius:'30px',
        fontFamily:'Permanent Marker',
        textAlign:'center',
        background:theme.palette.type==='dark'?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)',fontSize:'25px',
    }
    
}))


const Title = () => {
    //const theme = useTheme();
    const [state, dispatch] = useTracked();
    //const DARK_MODE = theme.palette.type==='dark';
    //let styleProps = {DARK_MODE:DARK_MODE}
    const classes = useStyles()

    // Store ----------------------------------------
    //const context = useContext(store)
    //const { state } = context
    console.log(state.title)
    // ----------------------------------------------

    return (
                    <InputBase
                        required
                        id="title"
                        label="Your decision"
                        placeholder="Your decision"
                        autoComplete="off" 
                        classes={{root:classes.inputRoot}}
                        //value={state.title}
                        value={props.title}
                        inputProps={{ 'aria-label': 'name of Decision', style: {textAlign: 'center'}}}
                        onChange={(event)=> dispatch({type: "TITLE_CHANGE", payload: { text: event.target.value}})}
                    />

    )
}

export default React.memo(Title);

