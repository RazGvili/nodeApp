
import React, { useState } from "react"

import {makeStyles,withStyles} from "@material-ui/core/styles"
import {Switch,Slider,Typography,Button,InputBase} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { green,red } from "../GlobalVars"

const CustomSwitch = withStyles({
    switchBase: {      
      color: green,
      '&$checked': {
        color: red,
      },
      '& + $track':{
        backgroundColor: '#909090',
        },
      '&$checked + $track': {
        backgroundColor: '#909090',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const CustomSlider = withStyles({
  })(props => <Slider {...props} defaultValue={3}
    valueLabelDisplay="auto"
    step={1}
    marks
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
        //color:'white',
        //fontFamily:'Permanent Marker',
        margin:'auto',
        padding:'10px',
        width:'100%',
        fontWeight:'700',
        textAlign:'center'
    },
    actionButton:{
        margin:'auto',
        width:'150px',
        textTransform: 'none'
    }
}))


export default function AddProCon(props) {

    const classes = useStyles()
    const [type, setType] = useState(props.type)
    const [text, setText] = useState(props.text)

    // Sliders ---------------------------------------
    const [impact, setImpact] = useState(3)
    const [confidence, setConfidence] = useState(3)
    const [effects, setEffects] = useState(3)

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleTypeChange = (event) => {
        if (type==='pro')
            setType('con')
        else
            setType('pro')
    }

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
            id: 0
        }
        props.setArgument(argumentObj)
    }

    let typeColor = type === 'con' ? red : green

    return (
            <div style={{textAlign:'center'}}>
                <div style={{display:'flex',lineHeight:'2.4em',width:'fit-content'}}>
                    PRO
                    <CustomSwitch   defaultChecked={type==='con'}
                                    onChange={handleTypeChange} />
                    CON
                </div>

                <InputBase
                    required
                    className={classes.input}
                    value={text}
                    label="Add Pro / Con"
                    onChange={handleTextChange}
                    inputProps={{ 'aria-label': 'name of Argument', style: { textAlign: 'center'} }}
                />
                <br/>

                <div className={classes.sliders}>  
                    <Typography gutterBottom>
                        Impact 
                    </Typography>
                    <CustomSlider
                        style={{color: typeColor}}
                        value={impact}
                        onChange={handleImpactChange}
                    />

                    <br/>
                    <br/>

                    <Typography gutterBottom>
                        Confidence
                    </Typography>
                    <CustomSlider
                        style={{color: typeColor}}
                        value={confidence}
                        onChange={handleConfidenceChange}
                    />

                    <br/>
                    <br/>
                    
                    <Typography gutterBottom>
                        Long term effects
                    </Typography>
                    <CustomSlider
                        style={{color: typeColor}}
                        value={effects}
                        onChange={handleEffectsChange}
                    />

                </div>

                <br/><br/>

                <Button
                    variant="contained"
                    className={classes.actionButton}
                    startIcon={<AddCircleOutlineIcon style={{color: typeColor}}/>}
                    onClick={addProCon}
                    disabled={text.length < 8 ? true : false } 
                >
                    {"Add " + type} 
                </Button>
       
        </div>
    )
}
