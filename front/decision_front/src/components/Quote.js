
import React from "react";
import {makeStyles} from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //fontFamily: 'Lora',
        textAlign: 'center'
    }    
}))

function Quote() {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <h4> “The straight line, a respectable optical illusion which ruins many a man.” <br/>
                ― Victor Hugo, Les Misérables
            </h4>
            <br/>
            <br/>    
        </div>
    )
}

export default Quote;