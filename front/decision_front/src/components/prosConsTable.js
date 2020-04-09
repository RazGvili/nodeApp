
import React, { useState, useEffect } from "react"

import {makeStyles} from "@material-ui/core/styles"
import {useMediaQuery,Slide,TextField,Chip,Grid,IconButton,Dialog,DialogContent} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import ShareIcon from '@material-ui/icons/Share'
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done'
import { Alert, AlertTitle } from '@material-ui/lab'

import AddProCon from './main/AddProCon'
import AddButton from './main/AddButton'

//import Timer from './timer'

import axios from "axios"

//slide animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://r-decisions-server.herokuapp.com/"

const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        maxWidth:'1000px',
        textAlign: 'center',
        margin: 'auto'
    }, 
    blackBoard:{
        background:'#323132',
        borderRadius:'15px',
        position:'relative',
        minHeight:'540px',
        margin:'10px',
        fontFamily:'Permanent Marker',
        border: 'tan solid 12px',
		borderTop: '#bda27e solid 12px',
		borderLeft: '#b19876 solid 12px',
		borderBottom: '#c9ad86 solid 12px',
		boxShadow: '0px 0px 6px 5px rgba(58, 18, 13, 0), 0px 0px 0px 2px #c2a782, 0px 0px 0px 4px #a58e6f, 3px 4px 8px 5px rgba(0, 0, 0, 0.5)',
		backgroundImage: 'radial-gradient( circle at left 30%, rgba(34, 34, 34, 0.3), rgba(34, 34, 34, 0.3) 80px, rgba(34, 34, 34, 0.5) 100px, rgba(51, 51, 51, 0.5) 160px, rgba(51, 51, 51, 0.5)), linear-gradient( 215deg, transparent, transparent 100px, #222 260px, #222 320px, transparent), radial-gradient( circle at right, #111, rgba(51, 51, 51, 1))',
    },
    blackBoardHorizontalLine:{
        position:'absolute',
        maxWidth:'90%',
        maxHeight:'100%',
        top:'7em',
        left:'5%'
    },
    blackBoardVerticalLine:{
        position:'absolute',
        maxWidth:'100%',
        maxHeight:'90%',
        top:'15px',
    }     
}))

export default function ProsConsTable() {
    const classes = useStyles()
    const smallScreen = useMediaQuery('(max-width:600px)');

    // Argument - Pro/Con ----------------------------
    
    const [argument, setArgument] = useState({

        proCon: "", // Argument pro/con text 
        impact: 0,
        confidence: 0, 
        effects: 0,
        type: 'pro',
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
    // Decision --------------------------------------

    const [title, setTitle] = useState("")
    const [showDialog, setShowDialog] = useState(false)
    const [type, setType] = useState("")
    const [text, setText] = useState("")
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [decisionIdServer, setDecisionIdServer] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(decision)
        try {  
            const res = await axios.post(`${BASE_URL}`+"/decisions", decision)
            const addedDecision = res.data
            console.log(`Added a new decision!`, addedDecision)
            setSaveSuccess(true)
            setDecisionIdServer(addedDecision._id)
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

    const addProCon = (argumentObj) => {
        argumentObj.id = argument.id + 1
        setArgument(argumentObj)
        setShowDialog(false)
    }

    const HandleOpenArgumentDialog = (text,type) => {
        setType(type)
        setText(text)
        setShowDialog(true)
    }

    useEffect(() => {

        if (argument.id > 0) {
            let decisionObj = {
                desc: title,
                pros: argument.type === 'pro' ? [...decision.pros, argument] : decision.pros,
                cons: argument.type === 'con' ? [...decision.cons, argument] : decision.cons
            }

            setDecision(decisionObj)
        }

    }, [argument])

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

            {saveSuccess && 
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

            <h2>{title}</h2>

            <div className={classes.blackBoard}>
            {!smallScreen && <>
                <img className={classes.blackBoardHorizontalLine} src="/images/chalk_sides.png" />
                <img className={classes.blackBoardVerticalLine} src="/images/chalk_updown.png" />
                </>
            }
                <Grid container >
                    
                    <Grid item xs={12} sm={6} style={{height:'4em',color:'#87BA55',fontSize:'35px',paddingTop:'1em'}}>
                        pros
                    </Grid>

                    {!smallScreen &&
                    <Grid item xs={6} style={{height:'4em',color:'#BA3737',fontSize:'35px',paddingTop:'1em'}}>
                        cons
                    </Grid> }
                    
                    <Grid item xs={12} sm={6}>
                        <AddButton type='pro' AddAction={HandleOpenArgumentDialog} />
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

                    {smallScreen &&
                    <Grid item xs={12} style={{height:'4em',color:'#BA3737',fontSize:'35px',paddingTop:'1em'}}>
                        cons
                    </Grid> }

                    <Grid item xs={12} sm={6} >
                    <AddButton type='con' AddAction={HandleOpenArgumentDialog}/>
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

                <Dialog open={showDialog}
                        fullWidth           
                        maxWidth={'sm'}
                        TransitionComponent={Transition}
                        onClose={()=> setShowDialog(false)} aria-labelledby="form-dialog-title"
                        >
                            <div style={{position:'relative'}}>
                                <IconButton onClick={()=> setShowDialog(false)} style={{position:'absolute',right:'0px',padding:'15px'}}>
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent >
                                    <AddProCon type={type} setArgument={addProCon} text={text} />
                                </DialogContent>
                            </div>
                </Dialog>


        </div>


    )
}