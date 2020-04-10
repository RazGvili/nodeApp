
import React, { useState } from "react"

import {makeStyles} from "@material-ui/core/styles"
import { IconButton,InputBase} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { green,red } from "../GlobalVars"
const DARK_MODE = false;

  
const useStyles = makeStyles(theme => ({
    container: {
        width: '65%',
        cursor:'pointer',
        //maxWidth: '200px',
        margin: 'auto',
        borderRadius:'5px',
        display:'flex',
        padding:'0px 30px',
        lineHeight:'2.9em',
        '&:hover':{
            backgroundColor:DARK_MODE?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)'
        }
    }, 
    input:{
        color:DARK_MODE?'white':'black',
        fontFamily:'Permanent Marker',
    },
    
}))


export default function AddButton(props) {

    const classes = useStyles()
    const [text, setText] = useState("")
    const [clicked, setClicked] = useState(false)
    const [error, setError] = useState(false)
    const typeColor = props.type === 'pro'? green:red
    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleClickAdd = () => {
        if (text.length>2){
            props.AddAction(text,props.type)
            setText('')
        }
        else
        setError(true)
    }

    return (<>
        <div  className={classes.container}  onClick={()=> setClicked(true)}>

            <IconButton onClick={handleClickAdd}>
                <AddCircleOutlineIcon style={{color:typeColor}}/>
            </IconButton>
            {clicked?
            <InputBase
            className={classes.input}
            placeholder={`Add ${props.type}`}
            value={text}
            autoFocus
            onChange={handleTextChange}
            inputProps={{ 'aria-label': 'Add New Argument' }}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  handleClickAdd();
                }
              }}
            />
            :
                <span style={{color:DARK_MODE?'white':'black'}}>{`Add ${props.type}`}</span>
            }
            
        </div>
        {error && <span style={{letterSpacing: '1.2px',color:'grey',fontSize:'11px',marginTop:'-15px'}}>must be longer than two charecters</span>}
        </>
    )
}
