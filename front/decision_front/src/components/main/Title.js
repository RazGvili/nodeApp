
import React,{useMemo} from "react"

import {makeStyles} from "@material-ui/core/styles"
import { InputBase} from '@material-ui/core'

import { useTracked } from '../../store'

import Icon from '@mdi/react'
import { ICONS } from '../custom/IconsData'


const useStyles = makeStyles(theme => ({
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
        color:theme.palette.type==='dark'?'#ffffffff':'black',
    }
    
}))



export default function Title(){
    const [state, dispatch] = useTracked();
    const {title,isReadOnly} = state
    const classes = useStyles()

    return useMemo(() => {
    return (
        <>
            {console.log(`<--render: title | ${title} -->`)}

                    <h3 className={classes.label}> My yes/no question </h3>
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
                    <Icon path={ICONS['Close']} size={2} style={{color: title.length > 2 ? "#fffffff0" : "green"}}/>




        </>
    )},[title,classes,isReadOnly])
}

