
import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {LinearProgress} from '@material-ui/core';
import { calculateAvg } from './Calculations';
import Icon from '@mdi/react';
import { ICONS } from '../custom/IconsData';
import { red, green } from '../GlobalVars';

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: '#ba3737',
      borderRadius:'45px',
      //margin:'0px 10px',
      margin: '0px',
    },
    bar: {
      borderRadius:0,
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

  
export default function ChoicesData({cons,pros,loading}) {
    const classes = useStyles();
    const ratio = calculateAvg(pros,cons)
    
    const prosConsRatio = cons.length+pros.length>0? (pros.length/(cons.length+pros.length))*100 : 50
    return (
        <div className={classes.root}>
            <BorderLinearProgress
        variant={loading?"query":"determinate"}
        color="secondary"
        value={prosConsRatio}
      />
      <br />
      {loading?
      <></>
      :
      ratio>0?
      <>
        <Icon size={1} path={ICONS['Like']} color={green} />
        <br />
        <span style={{color:green}}>{ratio}</span>
      </>
      :
      <>
        <Icon size={1} path={ICONS['Unlike']} color={red} />
        <br />
        <span style={{color:red}}>{ratio}</span>
      </>
      }
        </div>
    )
}