
import React from "react"

import {makeStyles} from "@material-ui/core/styles"
import { InputBase} from '@material-ui/core'


const DARK_MODE = false
  
const useStyles = makeStyles(theme => ({
    inputRoot:{
        color:DARK_MODE?'white':'black',
        width:'95%',
        maxWidth:'1000px',
        borderRadius:'30px',
        fontFamily:'Permanent Marker',
        textAlign:'center',
        background:DARK_MODE?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)',fontSize:'25px',
    }
    
}))


export default function Title(props) {

    const classes = useStyles()

    return (
                    <InputBase
                        required
                        id="title"
                        label="Your decision"
                        placeholder="Your decision"
                        autoComplete="off" 
                        classes={{root:classes.inputRoot}}
                        value={props.title}
                        inputProps={{ 'aria-label': 'name of Decision', style: {textAlign: 'center'}}}
                        onChange={props.handleTitleChange}
                    />

    )
}
