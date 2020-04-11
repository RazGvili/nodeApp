
import React, { useState, useEffect, useContext } from "react"

import {makeStyles} from "@material-ui/core/styles"
import {useMediaQuery,Slide,Chip,Grid,IconButton,Dialog,DialogContent} from '@material-ui/core'
import {ICONS} from './custom/IconsData'
import Icon from '@mdi/react'

import AddProCon from './main/AddProCon'
import AddButton from './main/AddButton'
import Title from "./main/Title"

//import Timer from './timer'

import axios from "axios"
import Argument from "./main/Argument"

import {BASE_URL} from './GlobalVars'


//slide animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});

const DARK_MODE = false;

const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        maxWidth:'1000px',
        textAlign: 'center',
        margin: '10px auto'
    }, 
    blackBoard:
    DARK_MODE?
    {
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
    }
    :
    {
        background:'#F2F2F2',
        borderRadius:'15px',
        position:'relative',
        minHeight:'540px',
        margin:'10px',
        fontFamily:'Permanent Marker',
        border: '#C3BEBE solid 12px',
		borderTop: '#ADA6A6 solid 12px',
		borderLeft: '#989292 solid 12px',
		borderBottom: '#BBB6B6 solid 12px',
		boxShadow: '0px 0px 6px 5px rgba(58, 18, 13, 0), 0px 0px 0px 2px #ADA6A6, 0px 0px 0px 4px #989292, 3px 4px 8px 5px rgba(0, 0, 0, 0.5)',
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
    },
    blackBoardTitle:{
        fontFamily:'Permanent Marker',
        height:'4em',
        fontSize:'35px',
        paddingTop:'1em'
    }     
}))

export default function ProsConsTable(props) {
    const classes = useStyles()
    const smallScreen = useMediaQuery('(max-width:600px)')

    let decisionFromUrl = props.decision ? props.decision : false

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
    const [error, setError] = useState("")
    const [decisionIdServer, setDecisionIdServer] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(decision)
        //todo:: make sure title and object is good
        //if (title)
        try {  
            const res = await axios.post(`${BASE_URL}/decisions`, decision)
            const addedDecision = res.data
            console.log(`Added a new decision!`, addedDecision)
            setSaveSuccess(true)
            setDecisionIdServer(addedDecision._id)

        } catch (e) {
            console.error(e)
            setError(e.massage)
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const [decision, setDecision] = useState(
        decisionFromUrl ? decisionFromUrl : {
            desc: "",
            pros: [], 
            cons: [],
        }
    )

    const addProCon = (argumentObj) => {
        argumentObj.id = argument.id + 1
        setArgument(argumentObj)
        setShowDialog(false)
        setText('')
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
            <Title handleTitleChange={handleTitleChange} title={title} />
                
                    <IconButton type="submit" onClick={handleSubmit}>
                        <Icon
                            path={ICONS['Save']}
                            title="Save"
                            size={2}
                        />    
                    </IconButton>

            {saveSuccess && 
                <div>
                    <Chip
                        icon={<Icon path={ICONS['Check']} title="Saved" size={1} />}
                        label="Decision saved successfully!"
                    />
                    <br/>
                    <br/>
                    <Chip
                        icon={<Icon path={ICONS['Share']} title="Share" size={1} />}
                        label={`Share via --> ${BASE_URL}/decisions/${decisionIdServer}`}
                    />
                </div>
            }

            <br/>
            <br/>

            <div className={classes.blackBoard}>
            {!smallScreen && <>
                <img className={classes.blackBoardHorizontalLine} alt="chalk line" src={`/images/chalk_sides${DARK_MODE?'':'_black'}.png`} />
                <img className={classes.blackBoardVerticalLine} alt="chalk line" src={`/images/chalk_updown${DARK_MODE?'':'_black'}.png`} />
                </>
            }
                <Grid container >
                    
                    <Grid item xs={12} sm={6} className={classes.blackBoardTitle} style={{color:'#87BA55'}}>
                        pros
                    </Grid>

                    {!smallScreen &&
                    <Grid item xs={6} className={classes.blackBoardTitle} style={{color:'#BA3737'}}>
                        cons
                    </Grid> }
                    
                    <Grid item xs={12} sm={6}>
                        <AddButton type='pro' AddAction={HandleOpenArgumentDialog} />
                    {
                        decision.pros.map((arg, index) => {
                            return (
                                <Argument   arg={arg}
                                key={index}
                                handleArgumentRemove={() => handleArgumentRemove(arg, index)}
                                type="pro"
                    />
                            )
                        })
                    }     
                    </Grid>

                    {smallScreen &&
                        <Grid item xs={12} className={classes.blackBoardTitle} style={{color:'#BA3737'}}>
                            cons
                        </Grid> 
                    }

                    <Grid item xs={12} sm={6} >
                        <AddButton type='con' AddAction={HandleOpenArgumentDialog}/>
                        
                        {decision.cons.map((arg, index) => {
                            return (
                                <Argument   arg={arg}
                                            key={index}
                                            handleArgumentRemove={() => handleArgumentRemove(arg, index)}
                                            type="con"
                                />
                            )})
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
                                <IconButton onClick={()=> setShowDialog(false)} size="small" style={{position:'absolute',right:'0px',padding:'8px'}}>
                                <Icon path={ICONS['Close']} title="Close" size={1} />
                                </IconButton>
                                <DialogContent >
                                    <AddProCon type={type} setArgument={addProCon} text={text} />
                                </DialogContent>
                            </div>
                </Dialog>


        </div>


    )
}