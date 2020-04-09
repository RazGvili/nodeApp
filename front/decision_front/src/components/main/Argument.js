
import React, { useState } from "react"

import {makeStyles} from "@material-ui/core/styles"
import { Alert, AlertTitle } from "@material-ui/lab";
import { green,red } from "../GlobalVars"

  
const useStyles = makeStyles(theme => ({
    container: {
        width: '90%',
        padding: '10px',
        fontFamily:'Permanent Marker',
        margin: 'auto',
    }, 
}))


export default function Argument(props) {

    const classes = useStyles()

    return (
        <div className={classes.container}>
                    <Alert  icon={<span style={{color:props.type==='con'?red:green}}>*</span>}
                            onClose={() => props.handleArgumentRemove()}
                            style={{background: 'none',textAlign:'left',color:props.type==='con'?red:green}}>
                                        <AlertTitle>
                                            <b>{props.arg.proCon}</b>
                                        </AlertTitle>
                                        Impact:{` ${props.arg.impact}`} <br/>  
                                        Confidence:{` ${props.arg.confidence}`} <br/> 
                                        Long term effects:{` ${props.arg.effects}`} <br/> 
                                    
                    </Alert>
        </div>
    )
}
