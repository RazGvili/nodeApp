
import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {LinearProgress} from '@material-ui/core';
import { calculateAvg, calculateAvgTexts } from './Calculations';
import Icon from '@mdi/react';
import { ICONS } from '../custom/IconsData';
import { red, green } from '../GlobalVars';
import GaugeChart from 'react-gauge-chart'

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
    const ratioText = calculateAvgTexts(ratio)

    const prosConsRatio = cons.length+pros.length>0 ? (parseInt(ratio)/5)*100 : 50
    console.log(prosConsRatio)

    return (
        <div className={classes.root}>
            <BorderLinearProgress
        variant={loading?"query":"determinate"}
        color="secondary"
        value={prosConsRatio}
      />

      {/* <GaugeChart id="gauge-chart3" 
        nrOfLevels={2} 
        colors={[green, red]} 
        arcWidth={0.3}
        arcsLength={[prosConsRatio/100,1-prosConsRatio/100]}
        percent={1-prosConsRatio/100} 
        hideText
        style={{maxWidth:'300px',margin:'auto'}}
        arcPadding={0.01}
        //needleColor={}
      /> */}
      <br />
      {loading?
      <></>
      :
      ratio>0?
      <>
        <Icon size={1} path={ICONS['Like']} color={green} />
        <br />
        <span style={{color:green}}>{ratio}</span> <br/>
        <span style={{color:green}}>{ratioText}</span>
      </>
      :ratio<0?
      <>
        <Icon size={1} path={ICONS['Unlike']} color={red} />
        <br />
        <span style={{color:red}}>{ratio}</span> <br/>
        <span style={{color:red}}>{ratioText}</span>
      </>
      :
      <>
        <Icon size={1} path={ICONS['MiddleLike']} color={'grey'} />
        <br />
        <span style={{color:'grey'}}>{ratio}</span>
      </>
      }
        </div>
    )
}