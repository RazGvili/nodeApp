
import React, { useState, useEffect } from "react"

import {makeStyles} from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'

import { Alert, AlertTitle } from '@material-ui/lab'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import SaveIcon from '@material-ui/icons/Save'
import ShareIcon from '@material-ui/icons/Share'


import Timer from './timer'

import axios from "axios"


const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://r-decisions-server.herokuapp.com/"

const useStyles = makeStyles(theme => ({
    root: {
        width: '60%',
        textAlign: 'center',
        margin: 'auto'
    }, 
    proCon: {
        width: '50%',
        textAlign: 'center',
        margin: 'auto'
    },  
    sliders: {
        width: '40%',
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
        effects: 0,
        type: selectedValue,
        id: 0
    })

    function handleArgumentRemove(arg, index) {

        let temp = arg.type === 'pro' ? [...decision.pros] : [...decision.cons]
        temp = temp.filter(argu => argu.id !== arg.id)

        let decisionObj = {
            desc: title,
            pros: arg.type === 'pro' ? temp : decision.pros,
            cons: arg.type === 'con' ? temp : decision.cons
        }

        setDecision(decisionObj)
    }

    // -----------------------------------------------


    // Decision ---------------------------------------

    const [title, setTitle] = useState("")
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [decisionIdServer, serDecisionIdServer] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log(decision)

        try {
            
            const res = await axios.post(`${BASE_URL}`+"/decisions", decision)
            const addedDecision = res.data
        
            console.log(`Added a new decision!`, addedDecision)

            setSaveSuccess(true)
            serDecisionIdServer(addedDecision._id)
        
        } catch (e) {
            console.error(e)
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const [decision, setDecision] = useState({

        desc: "",
        pros: [], 
        cons: [],
    })

    const addProCon = () => {

        let id = argument.id + 1

        let proConText = proCon

        let argumentObj = {
            proCon: proConText, 
            impact: impact,
            confidence: confidence, 
            effects: effects,
            type: selectedValue === 'pro' ? 'pro' : 'con',
            id: id
        }

        setArgument(argumentObj)
    }

    useEffect(() => {

        if (argument.id > 0) {
            let decisionObj = {
                desc: title,
                pros: selectedValue === 'pro' ? [...decision.pros, argument] : decision.pros,
                cons: selectedValue === 'con' ? [...decision.cons, argument] : decision.cons
            }

            setDecision(decisionObj)
        }

    }, [argument])


    const handleSaveSuccessClick = () => {

    }


    // -----------------------------------------------

 
    let sliderColor = selectedValue === 'con' ? "#FF6347" : "#006400"

    // ===================================================================================================

    return (

        <div className={classes.root}>

            <br/>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}> 

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

                <IconButton type="submit">
                    <SaveIcon fontSize="large" />
                </IconButton>
                
            </form>

            { saveSuccess && 

                <div>
                    <Chip
                        icon={<DoneIcon />}
                        label="Decision saved successfully!"
                    />
                    <br/>
                    <br/>
                    <Chip
                        icon={<ShareIcon />}
                        label={"Share via --> ! " + `${BASE_URL}`+"/decisions/"+ decisionIdServer}
                    />
                </div>
            }

            <br/>
            <br/>

            {/* =================================================================================================== */}

            <Paper elevation={3} style={{margin: 'auto', textAlign: 'center', width:'60%', borderRadius: '35px', padding: '18px'}}>
            
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
                        helperText="min of 8 char"
                        
                        onChange={handleProConChange}
                    />
                </div>

                <br/>

                <div className={classes.sliders}>
                    
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

                    <br/><br/>
                    
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

                <br/><br/>

                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<AddCircleIcon style={{color: sliderColor}}/>}
                    style={{textTransform: 'none'}}
                    onClick={addProCon}
                    disabled={proCon.length < 8 ? true : false } 
                >
                    {"Add " + selectedValue} 
                </Button>

            </Paper>

            <h2>{title}</h2>

            <Grid container spacing={3}>

                <Grid item xs={6}>
                    {
                        decision.pros.map((arg, index) => {
                            return (
                                <Alert key={index+"pro"} onClose={() => {handleArgumentRemove(arg, index)}} style={{marginBottom: '5px'}}>
                                    <div style={{textAlign: 'left'}}>
                                    <AlertTitle><b>{arg.proCon}</b></AlertTitle>
                                        {"Impact: " +  arg.impact} <br/>  
                                        {"Confidence: " +  arg.confidence} <br/> 
                                        {"Long term effects: " +  arg.effects} <br/> 
                                    </div>
                                </Alert>
                            )
                        })
                    }                
                </Grid>

                <Grid item xs={6}>
                    {
                        decision.cons.map((arg, index) => {
                            return (
                                <Alert severity="error" key={index+"con"} onClose={() => {handleArgumentRemove(arg, index)}} style={{marginBottom: '5px'}}>
                                    <div style={{textAlign: 'left'}}>
                                        <AlertTitle><b>{arg.proCon}</b></AlertTitle>
                                        {"Impact: " +  arg.impact} <br/>  
                                        {"Confidence: " +  arg.confidence} <br/> 
                                        {"Long term effects: " +  arg.effects} <br/> 
                                    </div>
                                </Alert>
                            )
                        })
                    }                
                </Grid>

            </Grid>
            

        </div>
    )
}

export default ProsConsTable