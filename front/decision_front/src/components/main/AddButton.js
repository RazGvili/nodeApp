
import React, { useState } from "react"

import {makeStyles,useTheme} from "@material-ui/core/styles"
import { InputBase, Typography, Button} from '@material-ui/core'
import { green,red } from "../../helpers/GlobalVars"
//import Icon from "@mdi/react";
//import { ICONS } from "../custom/IconsData";
import {lang as texts} from '../../helpers/texts'
  
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
        width:'-webkit-fill-available'
    },
    button1:{
        color:'white',
        textTransform:'none',
        width:'78%',
        marginTop:'5PX',
        opacity:'0.7',
        '&:hover':{
            opacity:'1',
        }
    },
    buttonLabel:{
        fontFamily:'Nunito Sans, Varela Round, sans-serif'
    },
    multiline:{
        padding:'14px 0px 12px'
    }
}))


export default function AddButton({type,lang,AddAction}) {
    const theme = useTheme();
    const DARK_MODE = theme.palette.type==='dark';
    let styleProps = {DARK_MODE:DARK_MODE}
    const classes = useStyles(styleProps)
    const [text, setText] = useState("")
    const [clicked, setClicked] = useState(false)
    const [error, setError] = useState(false)
    const typeColor = type === 'pro'? green:red
    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleClickAdd = () => {
        if (text.length>2){
            AddAction(text,type)
            setText('')
        }
        else{
        setError(true)
        setTimeout(() => setError(false), 2000)
        }
    }

    return (<>
        <div  className={classes.container}  onClick={()=> setClicked(true)}>

            {/* <IconButton onClick={handleClickAdd} >
                <Icon path={ICONS['PlusOutline']} size={1} style={{color:text.length>2?DARK_MODE?'black':'white':typeColor, background:text.length>2?typeColor:'none',borderRadius:'45px',
                }}/>
            </IconButton> */}
            {clicked?
            <InputBase
            className={classes.input}
            placeholder={type === 'pro'? texts[lang]['TABLE_PRO_PLACEHOLDER']:texts[lang]['TABLE_CON_PLACEHOLDER']}
            value={text}
            autoFocus
            multiline
            rowsMax={10}
            classes={{multiline:classes.multiline}}
            onChange={handleTextChange}
            inputProps={{ 'aria-label': 'Add New Argument',style:{fontFamily:'Permanent Marker,Varela Round',WebkitFontSmoothing: 'antialiased',
            MozOsxFontMmoothing: 'grayscale'} }}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  handleClickAdd();
                }
              }}
            />
            :
                <span style={{color:DARK_MODE?'white':'black',
                fontFamily:'Permanent Marker,Varela Round',
                //WebkitFontSmoothing: 'antialiased',
                //MozOsxFontMmoothing: 'grayscale'
                }}>
                    {type === 'pro'? texts[lang]['TABLE_PRO_PLACEHOLDER']:texts[lang]['TABLE_CON_PLACEHOLDER']}
                    </span>
            }
 
        </div>
        {text.length>3 && 
            <Button className={classes.button1} style={{background:typeColor}} onClick={()=>{handleClickAdd()}} classes={{label:classes.buttonLabel}}>
                {type==='pro'?texts[lang]['TABLE_PRO_ADD_BUTTON']:texts[lang]['TABLE_CON_ADD_BUTTON']} 
            </Button>}
        {error && <Typography style={{letterSpacing: '1.2px',color:'grey',fontSize:'11px'}}>must be longer than two characters</Typography>}
        </>
    )
}
