
import React, { useState } from "react"

import {makeStyles} from "@material-ui/core/styles"
import { IconButton,InputBase,TextField} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { green,red } from "../GlobalVars"

  
const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        maxWidth: '200px',
        margin: 'auto',
        background:'rgba(0, 0, 0, 0.1)',
        borderRadius:'5px',
        display:'flex',
        padding:'0px 5px 0px 10px'
    }, 
    input:{
        color:'white',
        fontFamily:'Permanent Marker',
        textAlign:'center'
    },
    
}))


export default function Title(props) {

    const classes = useStyles()

    return (
        <div className={classes.container}>
                    <InputBase
                        required
                        id="title"
                        //label="Clearly define your decision"
                        placeholder="Should i quit my job?"
                        fullWidth
                        autoComplete="off"
                        //helperText="Defining and scoping is helpful"
                        value={props.title}
                        inputProps={{ 'aria-label': 'name of Decision', style: { textAlign: 'center'} }}

                        onChange={props.handleTitleChange}
                    />
        </div>
    )
}
