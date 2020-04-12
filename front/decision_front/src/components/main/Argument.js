
import React, { useState } from "react"

import {makeStyles} from "@material-ui/core/styles"
import { Alert, AlertTitle } from "@material-ui/lab";
import { green,red } from "../GlobalVars"
import { IconButton } from "@material-ui/core";
import Icon from "@mdi/react";
import { ICONS } from "../custom/IconsData";

  
const useStyles = makeStyles(theme => ({
    container: {
        width: '90%',
        padding: '10px',
        fontFamily:'Permanent Marker',
        margin: 'auto',
    },
    argumentMessage:{
        fontFamily:'Permanent Marker',
    },
    argumentRoot:{
        background: 'none',
        textAlign:'left',
    },
    argumentAction:{
        display:'grid'
    }
}))


export default function Argument(props) {

    const classes = useStyles()

    return (
        <div className={classes.container}>
                    <Alert  icon={<span style={{color:props.type==='con'?red:green,fontSize: '1.5em'}}>*</span>}
                            onClose={() => props.handleArgumentRemove()}
                            classes={{root:classes.argumentRoot,message:classes.argumentMessage,action:classes.argumentAction}}
                            action={
                                <>
                                <IconButton onClick={() => props.handleArgumentRemove()}>
                                  <Icon path={ICONS['Close']} size={1} />
                                </IconButton>
                                <IconButton onClick={() => props.handleEdit()}>
                                  <Icon path={ICONS['Edit']} size={1} />
                                </IconButton>
                                </>
                              }
                            style={{color:props.type==='con'?red:green}}>
                                        <AlertTitle style={{fontSize: '1.5em'}}>
                                            <b  style={{fontFamily:'Permanent Marker'}} >{props.arg.proCon}</b>
                                        </AlertTitle>
                                        Impact:{` ${props.arg.impact}`} <br/>  
                                        Confidence:{` ${props.arg.confidence}`} <br/> 
                                        Long term effects:{` ${props.arg.effects}`} <br/> 
                                    
                    </Alert>
        </div>
    )
}
