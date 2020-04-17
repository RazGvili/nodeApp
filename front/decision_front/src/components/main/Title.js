
import React,{useMemo} from "react"

import {makeStyles} from "@material-ui/core/styles"
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



export default function Title(){
    const [state, dispatch] = useTracked();
    const {title} = state
    const classes = useStyles()

    return useMemo(() => {
    return (
        <>
        {console.log(`<--render: title | ${title} -->`)}
                    <InputBase
                        required
                        id="title"
                        label="Your decision"
                        placeholder="Your decision"
                        autoComplete="off" 
                        classes={{root:classes.inputRoot}}
                        value={title}
                        inputProps={{ 'aria-label': 'name of Decision', style: {textAlign: 'center'}}}
                        onChange={(event)=> dispatch({type: "TITLE_CHANGE", payload: { text: event.target.value}})}
                    />
        </>
    )},[title,classes])
}

