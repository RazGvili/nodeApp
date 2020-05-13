
import React,{useMemo} from "react"

import {makeStyles} from "@material-ui/core/styles"
import { InputBase} from '@material-ui/core'

import { useTracked } from '../../store'

//import Icon from '@mdi/react'
//import { ICONS } from '../custom/IconsData'
import { green } from "../../helpers/GlobalVars"


const useStyles = makeStyles(theme => ({
    TitleContainer:{
        position:'relative',
        maxWidth:'1000px',
        margin:'auto'
    },
    inputRoot:{
        color:theme.palette.type==='dark'?'white':'black',
        width:'95%',
        maxWidth:'1000px',
        borderRadius:'30px',
        fontFamily:'Permanent Marker,Varela Round',
        textAlign:'center',
        lineHeight:'35px',
        background:theme.palette.type==='dark'?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)',
    },
    input:{
            color:theme.palette.type==='dark'?'white':'black'
    },
    label: {
        fontFamily:'Permanent Marker,Varela Round',
        fontWeight:'500',
        color:theme.palette.type==='dark'?'#ffffffff':'black',
    },
    tickContainer:{
        width: '40px',
        height: '40px',
        position: 'absolute',
        right: '4%',
        bottom: '10px',
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
    const {title,isReadOnly} = state
    const classes = useStyles()
    const ticks = title.length > 2
    return useMemo(() => {
    return (
        <div className={classes.TitleContainer}>
            {console.log(`<--render: title | ${title} -->`)}

                    <h4 className={classes.label}> My yes/no question </h4>
                    <InputBase
                        required
                        id="title"
                        disabled={isReadOnly}
                        multiline
                        rowsMax={6}
                        placeholder={'Example: "should i get a dog?"'}
                        autoComplete="off" 
                        classes={{root:classes.inputRoot,input:classes.input}}
                        value={title}
                        inputProps={{ 'aria-label': 'name of Decision', style: {fontSize:'40px',textAlign: 'center'}}}
                        onChange={(event)=> dispatch({type: "TITLE_CHANGE", payload: { text: event.target.value}})}
                    />
                    <div className={classes.tickContainer}>
                    <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 37 37" style={{enableBackground:'new 0 0 37 37'}} >
                    <path className={ticks?classes.circDrawn:classes.circ} style={{fill:'none',stroke:green,strokeWidth:'3',strokeLinejoin:'round',strokeMiterlimit:'10'}} d="
                        M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
                        />
                    <polyline className={ticks?classes.tickDrawn:classes.tick} style={{fill:'none',stroke:green,strokeWidth:'3',strokeLinejoin:'round',strokeMiterlimit:'10'}} points="
                        11.6,20 15.9,24.2 26.4,13.8 "/>
                    </svg>
                    </div>


        </div>
    )},[title,classes,isReadOnly])
}

