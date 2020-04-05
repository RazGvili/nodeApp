
import React, { useState } from "react"
import {makeStyles} from "@material-ui/core/styles"

import TextField from '@material-ui/core/TextField'

import Slider from '@material-ui/core/Slider'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import Typography from '@material-ui/core/Typography'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles(theme => ({
    root: {
        width: '60%',
        textAlign: 'center',
        margin: 'auto'
    }, 
    proCon: {
        width: '60%',
        textAlign: 'center',
        margin: 'auto'
    },  
    sliders: {
        width: '60%',
        textAlign: 'center',
        margin: 'auto'
    }    
}))


function ProsConsTable() {

    const classes = useStyles()

    // Radio ---------------------------------------
    const [selectedValue, setSelectedValue] = useState('pro')

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value)
        sliderColor = selectedValue
    }
    // -----------------------------------------------


    // Argument text  --------------------------------
    const [proCon, setProCon] = useState("")

    const handleProConChange = (event) => {
        setProCon(event.target.value)
    }
    // -----------------------------------------------


    // Sliders ---------------------------------------
    const [impact, setImpact] = useState(3)
    const [confidence, setConfidence] = useState(3)
    const [effects, setEffects] = useState(3)

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


    // Argument - Pro/Con ----------------------------
    const [argument, setArgument] = useState({

        proCon: "", // Argument pro/con text 
        impact: 0,
        confidence: 0, 
        effects: 0
    })
    // -----------------------------------------------


    // Decision ---------------------------------------

    const [title, setTitle] = useState("")

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const [decision, setDecision] = useState({

        title: "",
        pros: [], 
        cons: [],
    })

    const addProCon = () => {

        let argumentObj = {
            proCon: proCon, 
            impact: impact,
            confidence: confidence, 
            effects: effects   
        }
        
        let decisionObj = {
            title: title,
            pros: selectedValue === 'pro' ? [...decision.pros, argument] : decision.pros,
            cons: selectedValue === 'con' ? [...decision.cons, argument] : decision.cons
        }

        setArgument(argumentObj)
        setDecision(decisionObj)
    }

    // -----------------------------------------------


    let sliderColor = selectedValue === 'con' ? "#FF6347" : "#006400"

    return (
        <div className={classes.root}>

            <form noValidate autoComplete="off">

                <div>
                    
                    <TextField
                        required
                        id="outlined-required"
                        label="Clearly define your decision"
                        placeholder="Should i quit my job?"
                        variant="outlined"
                        fullWidth
                        helperText="Defining and scoping is helpful"
                        value={title}
                        onChange={handleTitleChange}
                    />

                </div>

            </form>

            <br/>
            <br/>

            <FormControl>
                <FormLabel> Add Pros / Cons </FormLabel>
                <br/>
                <RadioGroup row value={selectedValue} onChange={handleRadioChange}>
                    <FormControlLabel value="pro"  control={<Radio style={{color: '#006400'}} />} label="Pro" />
                    <FormControlLabel value="con"  control={<Radio style={{color: '#FF6347'}}/>} label="Con" />
                </RadioGroup>
            </FormControl>

            <br/>
            <br/>

            <div className={classes.proCon}>
                <TextField
                    required
                    id="outlined-required"
                    label="Add Pro / Con"
                    placeholder="My boss is amazing"
                    variant="outlined"
                    fullWidth
                    helperText=""
                    value={proCon}
                    onChange={handleProConChange}
                />
            </div>

            <div>

            <br/>
            <br/>

            <div className={classes.proCon}>
                
                <Typography gutterBottom>
                    Impact 
                </Typography>
                <Slider
                    defaultValue={3}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    style={{color: sliderColor}}
                    value={impact}
                    onChange={handleImpactChange}
                />

                <br/>
                <br/>

                <Typography gutterBottom>
                    Confidence
                </Typography>
                <Slider
                    defaultValue={3}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    style={{color: sliderColor}}
                    value={confidence}
                    onChange={handleConfidenceChange}

                />

                <br/>
                <br/>
                
                <Typography gutterBottom>
                    Long term effects
                </Typography>
                <Slider
                    defaultValue={3}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    style={{color: sliderColor}}
                    value={effects}
                    onChange={handleEffectsChange}
                />
            </div>

            <br/> 
            <br/> 

            <Button
                variant="contained"
                className={classes.button}
                startIcon={<AddCircleIcon style={{color: sliderColor}}/>}
                style={{textTransform: 'none'}}
                onClick={addProCon}
            >
                {"Add " + selectedValue} 
            </Button>

            </div>

        </div>
    )
}

export default ProsConsTable