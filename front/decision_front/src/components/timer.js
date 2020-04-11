import React, { useState, useEffect } from "react"
import {makeStyles} from "@material-ui/core/styles"
import {red,green} from './GlobalVars'
const useStyles = makeStyles(theme => ({
    progressRing:{
    transition: '0.375s stroke-dashoffset cubic-bezier(0.4, 0, 0.2, 1)',
  // axis compensation
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
    },
    countdown:{
        position: 'relative',
        //fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#333',
        width:'fit-content',
        padding: '1px',
        paddingTop: '3px',
        margin: '2px',
    },
    seconds:{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        zIndex: '2',
        fontSize:'large'
    }
}))

export default function Timer(props) {
    const classes = useStyles()
    
    const [seconds, setSeconds] = useState(props.seconds);
    const [offset, setOffset] = useState(0);
    const radius = 20;
    const circumference = radius * 2 * Math.PI;

    useEffect(() => {
        seconds > 0 && setTimeout(() => setProgress(seconds-1), 1000);
    }, [seconds]);

    function setProgress(CurrentSeconds){
        const offset = circumference - (CurrentSeconds) / props.seconds * circumference;
        setOffset(offset)
        setSeconds(CurrentSeconds)
    }
    return (
        <div className={classes.countdown}>
            <svg
                //className={classes.progressRing}
                width="80"
                height="80">
                <circle
                //className={classes.progressRing}
                //class="progress-ring__bg"
                    stroke={seconds>0?"#f1f1f1":red}
                    strokeWidth="10"
                    fill="transparent"
                    r="20"
                    cx="40"
                    cy="40"
                />
                <circle
                    className={classes.progressRing}
                    //class="progress-ring__circle seconds"
                    stroke="#35314f"
                    strokeWidth="11"
                    style={{
                        strokeDashoffset:offset,
                        strokeDasharray:`${circumference} ${circumference}`,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                        transition: '0.375s stroke-dashoffset cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    fill="transparent"
                    r="20"
                    cx="40"
                    cy="40"
                />
            </svg>

            <div className={classes.seconds} style={{color:seconds>0?'white':red}}>{seconds}</div>
        </div>
    );
}

