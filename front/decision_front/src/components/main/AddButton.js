
import React, { useState } from "react"

import {makeStyles,useTheme} from "@material-ui/core/styles"
import { IconButton,InputBase, Typography} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { green,red } from "../GlobalVars"
import Icon from "@mdi/react";
import { ICONS } from "../custom/IconsData";
  
const useStyles = makeStyles(theme => ({
    container: {
        width: '65%',
        cursor:'pointer',
        //maxWidth: '200px',
        margin: 'auto',
        borderRadius:'5px',
        display:'flex',
        //justifyContent:'center',
        padding:'0px 30px',
        lineHeight:'2.9em',
        '&:hover':{
            backgroundColor:props => props.DARK_MODE?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)'
        }
    }, 
    input:{
        color:props => props.DARK_MODE?'white':'black',
    },
    svgShadow:{
        
    }
}))


export default function AddButton(props) {
    const theme = useTheme();
    const DARK_MODE = theme.palette.type==='dark';
    let styleProps = {DARK_MODE:DARK_MODE}
    const classes = useStyles(styleProps)
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
        else{
        setError(true)
        setTimeout(() => setError(false), 2000)
        }
    }

    return (<>
        <div  className={classes.container}  onClick={()=> setClicked(true)}>

            <IconButton onClick={handleClickAdd} >
                <Icon path={ICONS['PlusOutline']} size={1} style={{color:text.length>2?DARK_MODE?'black':'white':typeColor, background:text.length>2?typeColor:'none',borderRadius:'45px',
                }}/>
            </IconButton>
            {clicked?
            <InputBase
            className={classes.input}
            placeholder={`Add ${props.type}`}
            value={text}
            autoFocus
            onChange={handleTextChange}
            inputProps={{ 'aria-label': 'Add New Argument',style:{fontFamily:'Permanent Marker',WebkitFontSmoothing: 'antialiased',
            MozOsxFontMmoothing: 'grayscale'} }}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  handleClickAdd();
                }
              }}
            />
            :
                <span style={{color:DARK_MODE?'white':'black',fontFamily:'Permanent Marker',WebkitFontSmoothing: 'antialiased',
                MozOsxFontMmoothing: 'grayscale'}}>{`Add ${props.type}`}</span>
            }
            
        </div>
        {error && <Typography style={{letterSpacing: '1.2px',color:'grey',fontSize:'11px'}}>must be longer than two characters</Typography>}
        </>
    )
}
