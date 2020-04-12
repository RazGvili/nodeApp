
import React, { useState } from "react"

import {makeStyles,withStyles} from "@material-ui/core/styles"
import {Slider,Button,InputBase, Grid,
    //Switch
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { green,red,sliderTexts } from "../GlobalVars"

const sliderTextWidth=['','200','400','600','700','900']
const DARK_MODE = false

// const CustomSwitch = withStyles({
//     switchBase: {      
//       color: green,
//       '&$checked': {
//         color: red,
//       },
//       '& + $track':{
//         backgroundColor: '#909090',
//         },
//       '&$checked + $track': {
//         backgroundColor: '#909090',
//       },
//     },
//     checked: {},
//     track: {},
//   })(Switch);

  const CustomSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        content:'test',
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
      track: {
        height: 8,
        borderRadius: 4,
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },

  })(props => <Slider {...props} defaultValue={3}
    step={1}
    min={1}
    max={5}/>);


const useStyles = makeStyles(theme => ({
    root: {
        width: '60%',
        textAlign: 'center',
        margin: 'auto'
    }, 
    sliders: {
        width: '100%',
        maxWidth:'300px',
        textAlign: 'center',
        margin: 'auto'
    },
    input:{
        color:DARK_MODE?'white':'black',
        //fontFamily:'Permanent Marker',
        fontSize:'18px',
        margin:'auto',
        padding:'10px',
        width:'95%',
        fontWeight:'700',
        textAlign:'center',
        borderRadius:'10px',
        background:DARK_MODE?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)'
    },
    actionButtonPro:{
        margin:'0px auto 10px',
        color:'white',
        background:green,
        borderRadius:'30px',
        width:'150px',
        textTransform: 'none',
        fontSize:'18px',
        fontWeight:'700',
        '&:focus,&:hover,&$active': {
            background:'#577836'
          },
    },
    actionButtonCon:{
        margin:'0px auto 10px',
        color:'white',
        background:red,
        borderRadius:'30px',
        width:'150px',
        textTransform: 'none',
        fontSize:'18px',
        fontWeight:'700',
        '&:focus,&:hover,&$active': {
            background:'#932b2b'
          },
    }
}))


export default function AddProCon(props) {

    const classes = useStyles()
    //const [type, setType] = useState(props.type)
    const {type,edit } = props
    const [text, setText] = useState(edit?edit.proCon:props.text)
    
    // Sliders ---------------------------------------
    const [impact, setImpact] = useState(edit?edit.impact:3)
    const [confidence, setConfidence] = useState(edit?edit.confidence:3)
    const [effects, setEffects] = useState(edit?edit.effects:3)
    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    // const handleTypeChange = (event) => {
    //     if (type==='pro')
    //         setType('con')
    //     else
    //         setType('pro')
    // }

    const handleImpactChange = (event, value) => {
        setImpact(value)
    }

    const handleConfidenceChange = (event, value) => {
        setConfidence(value)
    }

    const handleEffectsChange = (event, value) => {
        setEffects(value)
    }
    // -----------------------------------------------

    const addProCon = () => {
        let argumentObj = {
            proCon: text, 
            impact: impact,
            confidence: confidence, 
            effects: effects,
            type: type,
            id: edit?edit.id:0
        }
        if (edit)
            props.editAction(argumentObj)
        else
            props.setArgument(argumentObj)
    }

    let typeColor = type === 'con' ? red : green

    return (
            <div style={{textAlign:'center'}}>
                {/* <div style={{display:'flex',lineHeight:'2.4em',width:'fit-content'}}>
                    PRO
                    <CustomSwitch   defaultChecked={type==='con'}
                                    onChange={handleTypeChange} />
                    CON
                </div> */}
                <InputBase
                    required
                    className={classes.input}
                    value={text}
                    label="Add Pro / Con"
                    onChange={handleTextChange}
                    inputProps={{ 'aria-label': 'name of Argument', style: { textAlign: 'center'} }}
                />

                <div className={classes.sliders}>  
                <Grid container spacing={1} style={{margin:'15px auto',width:'100%'}}>
                    <Grid item xs={6}>
                        <span style={{}}>Impact</span>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontWeight:sliderTextWidth[impact]}}>
                            {sliderTexts[impact]}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomSlider
                            style={{color: typeColor}}
                            value={impact}
                            onChange={handleImpactChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                    Confidence
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontWeight:sliderTextWidth[confidence]}}>
                            {sliderTexts[confidence]}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomSlider
                            style={{color: typeColor}}
                            value={confidence}
                            onChange={handleConfidenceChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                    Long term effects
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontWeight:sliderTextWidth[effects]}}>
                            {sliderTexts[effects]}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomSlider
                            style={{color: typeColor}}
                            value={effects}
                            onChange={handleEffectsChange}
                        />
                    </Grid>
                </Grid>
                
                </div>

                <Button
                    className={type==='pro'?classes.actionButtonPro:classes.actionButtonCon}
                    startIcon={<AddCircleOutlineIcon style={{color: 'white'}}/>}
                    onClick={addProCon}
                    disabled={text.length < 2 ? true : false } 
                >
                    {`${props.edit?'Edit':'Add'} ${type} `}
                </Button>
       
        </div>
    )
}
