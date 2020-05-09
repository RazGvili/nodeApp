
import React from "react"

import {makeStyles} from "@material-ui/core/styles"
import { Alert, AlertTitle } from "@material-ui/lab";
import { green,red } from "../../helpers/GlobalVars"
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


export default function Argument({isReadOnly,type,handleArgumentRemove,handleEdit,arg}) {

    const classes = useStyles()
    //console.log(arg)
    return (
        <div className={classes.container}>
                    <Alert  icon={<span style={{color:type==='con'?red:green,fontSize: '1.5em'}}>*</span>}
                            //onClose={isReadOnly? () => null : () => handleArgumentRemove()}
                            classes={{root:classes.argumentRoot,message:classes.argumentMessage,action:classes.argumentAction}}
                            action={isReadOnly? null :
                                <>
                                <IconButton onClick={() => handleArgumentRemove()}>
                                  <Icon path={ICONS['Close']} size={1} />
                                </IconButton>
                                <IconButton onClick={() => handleEdit()}>
                                  <Icon path={ICONS['Edit']} size={1} />
                                </IconButton>
                                </>
                              }
                            style={{color:type==='con'?red:green}}>
                                        <AlertTitle style={{fontSize: '1.5em'}}>
                                            <b  style={{fontFamily:'Permanent Marker'}} >{arg.proCon}</b>
                                        </AlertTitle>
                                        Impact:{` ${arg.impact}`} <br/>  
                                        Confidence:{` ${arg.confidence}`} <br/> 
                                        Long term effects:{` ${arg.effects}`} <br/> 
                                    
                    </Alert>
        </div>
    )
}
