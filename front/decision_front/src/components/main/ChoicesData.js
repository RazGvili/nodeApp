
import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {LinearProgress} from '@material-ui/core';

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: '#ba3737',
      borderRadius:'45px',
      //margin:'0px 10px',
      margin: '0px',
    },
    bar: {
      borderRadius: 0,
      backgroundColor: '#87ba55',
    },
  })(LinearProgress);

  const useStyles = makeStyles((theme) => ({
    root: {
        margin:'10px auto 0px',
        width:'95%',
        maxWidth:'1000px',
    },

  }));

  
export default function ChoicesData({data,loading}) {
    const classes = useStyles();
    const prosConsRatio = data.cons.length+data.pros.length>0? (data.pros.length/(data.cons.length+data.pros.length))*100 : 50
    return (
        <div className={classes.root}>
            <BorderLinearProgress
        variant={loading?"query":"determinate"}
        color="secondary"
        value={prosConsRatio}
      />
        </div>
    )
}