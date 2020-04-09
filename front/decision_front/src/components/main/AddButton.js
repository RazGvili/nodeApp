
import React, { useState } from "react"

import {makeStyles} from "@material-ui/core/styles"
import { IconButton,InputBase} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { green,red } from "../GlobalVars"

  
const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        maxWidth: '200px',
        margin: 'auto',
        background:'rgba(255, 255, 255, 0.1)',
        borderRadius:'5px',
        display:'flex',
        padding:'0px 5px 0px 10px'
    }, 
    input:{
        color:'white',
        fontFamily:'Permanent Marker',
    },
    
}))


export default function AddButton(props) {

    const classes = useStyles()
    const [text, setText] = useState("")
    const typeColor = props.type === 'pro'? green:red
    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleClickAdd = () => {
        if (text.length>2){
            props.AddAction(text,props.type)
            setText('')
        }
    }

    return (
        <div className={classes.container}>
            <InputBase
            className={classes.input}
            placeholder={`Add ${props.type}`}
            value={text}
            onChange={handleTextChange}
            inputProps={{ 'aria-label': 'Add New Argument' }}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  handleClickAdd();
                }
              }}
            />
            <IconButton onClick={handleClickAdd}>
                <AddCircleOutlineIcon style={{color:typeColor}}/>
            </IconButton>
        </div>
    )
}
