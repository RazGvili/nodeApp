
import React,{useMemo, useState, useEffect} from "react"

import {makeStyles} from "@material-ui/core/styles"
import { InputBase} from '@material-ui/core'
import {lang as texts} from '../../helpers/texts' 
import { useTracked } from '../../store'
import { ICONS } from '../custom/IconsData';
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react'

//import Icon from '@mdi/react'
//import { ICONS } from '../custom/IconsData'
import { green } from "../../helpers/GlobalVars"


const useStyles = makeStyles(theme => ({
    TitleContainer:{
        maxWidth:'900px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '30px auto 0px',
    },
    inputRoot:{
        color:theme.palette.type==='dark'?'white':'black',
        width:'65%',
        maxWidth:'900px',
        borderRadius:'30px',
        fontFamily:'Permanent Marker,Varela Round',
        textAlign:'center',
        lineHeight:'35px',
        background:theme.palette.type==='dark'?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)',
        flex: '1 1 150px',
        marginRight: '5px',
    },
    input:{
        color:theme.palette.type==='dark'?'white':'black'
    },
    label: {
        fontFamily:'Permanent Marker,Varela Round',
        fontWeight:'500',
        color:theme.palette.type==='dark'?'#ffffffff':'black',
        flex: '0 1 150px',
        fontSize: '30px',
        margin: 'auto 0px'
    },
    submitButton: {
        fontFamily:'Permanent Marker,Varela Round',
        fontWeight:'500',
        color:theme.palette.type==='dark'?'#ffffffff':'black',
        flex: '0 1 120px',
        borderRadius: '30px',
        margin: 'auto 5px',
        backgroundColor: '#00a25100',
        height: '40px'
    },
    tickContainer:{
        width: '40px',
        height: '40px',
        margin: 'auto'
        // position: 'absolute',
        // right: '4%',
        // bottom: '10px',
    },
    circ:{
        opacity: '0',
        strokeDasharray: '130',
        strokeDashoffset: '130',
        WebkitTransition: 'all 1s',
        MozTransition: 'all 1s',
        MsTransition: 'all 1s',
        OTransition: 'all 1s',
        transition: 'all 1s',
    },
    circDrawn:{
        opacity: '1',
        strokeDashoffset: '0',
        strokeDasharray: '130',
        
        WebkitTransition: 'all 1s',
        MozTransition: 'all 1s',
        MsTransition: 'all 1s',
        OTransition: 'all 1s',
        transition: 'all 1s',
    },
    tick:{
        strokeDasharray: '50',
        strokeDashoffset: '50',
        WebkitTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        MozTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        MsTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        OTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        transition: 'stroke-dashoffset 1s 0.5s ease-out',
    },
    tickDrawn:{
        opacity: '1',
        strokeDashoffset: '0',
        strokeDasharray: '50',
        //strokeDashoffset: '50',
        WebkitTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        MozTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        MsTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        OTransition: 'stroke-dashoffset 1s 0.5s ease-out',
        transition: 'stroke-dashoffset 1s 0.5s ease-out',
    }
}))

export default function Title(){
    const [state, dispatch] = useTracked();
    const {title,isReadOnly,lang} = state
    const classes = useStyles()
    const placeholder = texts[lang][`TITLE_PLACEHOLDER_${+Math.floor(Math.random() * 4)+ 1}`]
    
    const [text, setText] = useState(title.slice())
    let titleMin = text.length < 3

    const [showCheck, setShowCheck] = useState(false)

    const submitTitle = () => {
        dispatch({type: "TITLE_CHANGE", payload: { text: text}})
        setShowCheck(true)
        setTimeout(() => setShowCheck(false), 3000);
    }

    const onChangeHandler = e => {
        setText(e.target.value);
    };

    return useMemo(() => {
        return (

            <>

                <div className={classes.TitleContainer}>

                    {console.log(`<--render: title | ${title} -->`)}

                    <p className={classes.label}>{texts[lang]['TITLE_LABEL']}</p> 

                    <InputBase
                        required
                        id="title"
                        disabled={isReadOnly}
                        multiline
                        rowsMax={6}
                        placeholder={placeholder}
                        autoComplete="off" 
                        classes={{root:classes.inputRoot,input:classes.input}}
                        value={text}
                        inputProps={{ 'aria-label': 'name of Decision', style: {fontSize:'30px',textAlign: 'center'}}}
                        onChange={(e)=> {onChangeHandler(e)}}
                    />

                    <Button 
                        onClick={()=>submitTitle()} 
                        className={classes.submitButton}
                        variant="contained"
                        disabled={titleMin || showCheck}
                    >
                        <p style={{fontFamily:'Permanent Marker,Varela Round',fontWeight:'400'}}>{texts[lang]['TITLE_BUTTON']}</p>
                    </Button>

                    {showCheck && <div className={classes.tickContainer}>
                        <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 37 37" style={{enableBackground:'new 0 0 37 37'}} >
                            <path className={!titleMin?classes.circDrawn:classes.circ} style={{fill:'none',stroke:green,strokeWidth:'3',strokeLinejoin:'round',strokeMiterlimit:'10'}} d="
                                M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
                                />
                            <polyline className={!titleMin?classes.tickDrawn:classes.tick} style={{fill:'none',stroke:green,strokeWidth:'3',strokeLinejoin:'round',strokeMiterlimit:'10'}} points="
                                11.6,20 15.9,24.2 26.4,13.8 "/>
                        </svg>
                    </div>}

                </div>
                
            


            </>

    )},[title,classes,isReadOnly,lang,text, showCheck])
}

{/* 
<div className={classes.tickContainer}>
    <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 37 37" style={{enableBackground:'new 0 0 37 37'}} >
        <path className={ticks?classes.circDrawn:classes.circ} style={{fill:'none',stroke:green,strokeWidth:'3',strokeLinejoin:'round',strokeMiterlimit:'10'}} d="
            M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
            />
        <polyline className={ticks?classes.tickDrawn:classes.tick} style={{fill:'none',stroke:green,strokeWidth:'3',strokeLinejoin:'round',strokeMiterlimit:'10'}} points="
            11.6,20 15.9,24.2 26.4,13.8 "/>
    </svg>
</div> */}