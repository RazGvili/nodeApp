
import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {LinearProgress, Paper } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { calculateAvg, calculateAvgTexts } from './Calculations';
import Icon from '@mdi/react';
import { ICONS } from '../custom/IconsData';
import { red, green } from '../../helpers/GlobalVars';
import {lang as texts} from '../../helpers/texts' 
import { useTrackedState } from '../../store'

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
        margin:'0px auto',
        maxWidth:'1000px',
    },
    paper: {
      backgroundColor: '#00000033',
      padding: '3%',
      borderRadius:'30px',
      width:'95%',
    },

  }));

  
export default function ChoicesData({cons,pros,loading}) {
    const state = useTrackedState()
    const { lang } = state
    const classes = useStyles();

    // Ratio calc
    const ratio = calculateAvg(pros,cons)
    const ratioText = calculateAvgTexts(ratio)
    const prosConsRatio = cons.length+pros.length>0 ? 50 + (10*ratio) : 50
    
    // Display results logic
    const [toDisplay, setToDisplay] = useState(false)
    const [resultsExpanded, setResultsExpanded] = useState(true);

    if (!toDisplay && pros.length >= 1 && cons.length >= 1) {
      setToDisplay(true)
    }

    const toggleResultsExpanded = () => {
      setResultsExpanded(!resultsExpanded);
    };

    if (!loading && toDisplay) {
      return (

        <div className={classes.root}>

          <Accordion expanded={resultsExpanded} onChange={toggleResultsExpanded} style={{borderRadius: '30px', width: '60%', maxWidth:'900px', margin: '0px auto'}}>

            <AccordionSummary
              expandIcon={<Icon size={1} path={ICONS['ExpandOpen']} />}
            >
              <span >{texts[lang]['SCORES_TITLE']}</span>
            </AccordionSummary>

            <AccordionDetails>

              <Paper className={classes.paper}>

                <br/><br/>

                <BorderLinearProgress
                  variant={loading?"query":"determinate"}
                  color="secondary"
                  value={prosConsRatio}
                />
                <br />

                {
                  ratio>0?
                  <>
                    <Icon size={1} path={ICONS['Like']} color={green} />
                    <br />
                    <span style={{color:green}}>{ratio}</span> <br/>
                    <span style={{color:green}}>{ratioText}</span>
                  </>
                  :
                  ratio<0?
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

              </Paper>   
        
            </AccordionDetails>

          </Accordion>
          
        </div>
      )

    } else {
      return <></>
    }

}


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

   // return (

        
    //     <div className={classes.root}>
    //       <Paper className={classes.paper}>

    //         <span>{texts[lang]['SCORES_TITLE']}</span>
    //         <br/><br/>

    //         {
    //           toDisplay && !loading &&
    //             <> 
    //               <BorderLinearProgress
    //                 variant={loading?"query":"determinate"}
    //                 color="secondary"
    //                 value={prosConsRatio}
    //               />
    //               <br />
    //             </>
    //         }

    //         {
    //           toDisplay && !loading ?

    //             ratio>0?
    //             <>
    //               <Icon size={1} path={ICONS['Like']} color={green} />
    //               <br />
    //               <span style={{color:green}}>{ratio}</span> <br/>
    //               <span style={{color:green}}>{ratioText}</span>
    //             </>
    //             :
    //             ratio<0?
    //             <>
    //               <Icon size={1} path={ICONS['Unlike']} color={red} />
    //               <br />
    //               <span style={{color:red}}>{ratio}</span> <br/>
    //               <span style={{color:red}}>{ratioText}</span>
    //             </>
    //             :
    //             <>
    //               <Icon size={1} path={ICONS['MiddleLike']} color={'grey'} />
    //               <br />
    //               <span style={{color:'grey'}}>{ratio}</span>
    //             </>
                
    //           :
    //           <></>
    //         }
    //       </Paper>
    //     </div>
    // )