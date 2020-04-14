
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import {makeStyles,useTheme} from "@material-ui/core/styles"
import { Redirect } from 'react-router-dom'
import { Skeleton } from "@material-ui/lab"
import {useMediaQuery,Slide,Grid,Dialog,DialogContent} from '@material-ui/core'

import AddProCon from './main/AddProCon'
import AddButton from './main/AddButton'
import Title from "./main/Title"
import Header from "./Header"
import ChoicesData from "./main/ChoicesData"
import Argument from "./main/Argument"
import {BASE_URL} from './GlobalVars'
import { store } from '../store'

//slide animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});


const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        //background:props=> props.DARK_MODE?theme.palette.background.dark:theme.palette.background.light,
        textAlign: 'center',
    }, 
    blackBoard:
    props=> props.DARK_MODE?
    {
        background:'#323132',
        maxWidth:'1000px',
        borderRadius:'15px',
        position:'relative',
        minHeight:'540px',
        margin:'10px auto',
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
        maxWidth:'1000px',
        borderRadius:'15px',
        position:'relative',
        minHeight:'540px',
        margin:'10px auto',
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
    },
    boardContainer:{
        padding:'10px'
    },
    titleContainer:{
        margin:'10px auto'
    },
    dialogPaper:{
        background:props=> props.DARK_MODE?theme.palette.background.dark:theme.palette.background.light,
    }
}))

export default function ProsConsTable(props) {
    const theme = useTheme();
    const DARK_MODE = theme.palette.type==='dark';
    let styleProps = {DARK_MODE:DARK_MODE}
    const classes = useStyles(styleProps)
    const smallScreen = useMediaQuery('(max-width:600px)')

    // Store ----------------------------------------
    const context = useContext(store)
    const { dispatch } = context
    // ----------------------------------------------

    const {loading,decisionFromUrl,errorAbove} = props

    const [argumentEdit, setArgumentEdit] = useState(null)
    const [decision, setDecision] = useState(
        decisionFromUrl ? decisionFromUrl : {
            desc: "",
            pros: [], 
            cons: [],
        })

    const [title, setTitle] = useState(decisionFromUrl ? decisionFromUrl.desc : "")
    const [showDialog, setShowDialog] = useState(false)
    const [type, setType] = useState("")
    const [text, setText] = useState("")
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [error, setError] = useState("")
    const [isNew, setIsNew] = useState(false)


    // Lock ----------------------------------------
    const [showLock, setShowLock] = useState(true)
    const [isReadOnly, setIsReadOnly] = useState(false)
    // ---------------------------------------------
    
    useEffect(() => {
        if (props.decisionFromUrl) {
            setDecision({...props.decisionFromUrl})
            setTitle(props.decisionFromUrl.desc)
        } 
    }, [props.decisionFromUrl])

    function handleArgumentRemove(arg) {
        let temp = arg.type === 'pro' ? [...decision.pros] : [...decision.cons]
        temp = temp.filter(argu => argu.id !== arg.id)

        let decisionObj = {
            ...decision,
            desc: title,
            pros: arg.type === 'pro' ? temp : decision.pros,
            cons: arg.type === 'con' ? temp : decision.cons
        }
        setDecision(decisionObj)
    }
    

    const handleSubmit = async () => {
        console.log("handleSubmit")
        console.log(decision)

        try {

            let res = null

            let changedObj = {
                desc: title,
                pros: decision.pros,
                cons: decision.cons,
            }

            if (decision.hasOwnProperty("_id")) {
                res = await axios.patch(`${BASE_URL}/decisions/${decision._id}`, changedObj)

            } else {
                changedObj.isReadOnly = isReadOnly
                res = await axios.post(`${BASE_URL}/decisions`, changedObj)
                setDecision(res.data)
            }
            setSaveSuccess(true)

            dispatch({type: "OPEN_SNACK", payload: {type: "success", text: "decision saved!"}})

        } catch (e) {
            console.error(e)
            setError(e.massage)

            dispatch({type: "OPEN_SNACK", payload: {type: "error", text: `Something went wrong. [${e}]`}})
        }
    }

    const handleTitleChange = (event) => {
        //setTitle(event.target.value)
        dispatch({type: "TITLE_CHANGE", payload: { text: event.target.value}})

    }

    const addProCon = (argumentObj) => {
        setArgumentEdit(null)
        argumentObj.id = argumentObj.id + 1
        let decisionObj = {
            ...decision,
            desc: title,
            pros: argumentObj.type === 'pro' ? [...decision.pros, argumentObj] : decision.pros,
            cons: argumentObj.type === 'con' ? [...decision.cons, argumentObj] : decision.cons
        }
        setDecision(decisionObj)
        setShowDialog(false)
        setText('')
    }

    const editProCon = (argumentObj) => {
        setArgumentEdit(null)
        let decisionObj = {
            ...decision,
            desc: title,
            pros: argumentObj.type === 'pro' ?
                decision.pros.map(obj => argumentObj.id===obj.id? argumentObj : obj)
                : decision.pros,
            cons: argumentObj.type === 'con' ? 
                decision.cons.map(obj => argumentObj.id===obj.id? argumentObj : obj)
                : decision.cons
        }
        setDecision(decisionObj)
        setShowDialog(false)
        setText('')
    }


    const HandleOpenArgumentDialog = (text,type,arg='') => {
        if (arg){
            setArgumentEdit(arg)
        }
        setType(type)
        setText(text)
        setShowDialog(true)
    }

    const HandleCloseArgumentDialog = () => {
        setArgumentEdit(null)
        setShowDialog(false)
    }

    // Needed to cover the case of decision from redirect & decision from url
    useEffect(() => {
        if (decision.hasOwnProperty("_id")) {
            setShowLock(false)
        }
    }, [decision])

    // ===================================================================================================

    return (

        <div className={classes.root}>

            { saveSuccess && 
                <Redirect to={{
                    pathname:`/d/${decision._id}`,
                    state:{decision:decision }}} /> 
            }

            <Header showLock={showLock} isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} handleSubmit={handleSubmit} loading={loading}/>

            
            <div className={classes.titleContainer}>
            {loading?
            <Skeleton animation="wave" width='50%' height={50} style={{margin:'auto'}}/>
            :
            <Title handleTitleChange={handleTitleChange} title={title} />
            }
            </div>

            <ChoicesData data={decision} loading={loading} />

            <div className={classes.boardContainer}>
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
                    {loading?
                        <>
                            <Skeleton animation="wave" width='70%' height={30} style={{margin:'auto'}}/>
                            <Skeleton animation="wave" width='70%' height={30} style={{margin:'auto'}}/>
                            <Skeleton animation="wave" width='70%' height={30} style={{margin:'auto'}}/>
                        </>
                        :
                        <>
                            <AddButton type='pro' AddAction={HandleOpenArgumentDialog} />
                                {
                                    decision.pros.map((arg, index) => {
                                        return (
                                            <Argument   arg={arg}
                                            key={index}
                                            handleArgumentRemove={() => handleArgumentRemove(arg)}
                                            handleEdit={()=> HandleOpenArgumentDialog('','pro',arg)}
                                            type="pro"
                                />
                                        )
                                    })
                                } 
                        </>    
                    }
                    </Grid>

                    {smallScreen &&
                        <Grid item xs={12} className={classes.blackBoardTitle} style={{color:'#BA3737'}}>
                            cons
                        </Grid> 
                    }

                    <Grid item xs={12} sm={6} >
                        {loading?
                            <>
                                <Skeleton animation="wave" width='70%' height={30} style={{margin:'auto'}}/>
                                <Skeleton animation="wave" width='70%' height={30} style={{margin:'auto'}}/>
                                <Skeleton animation="wave" width='70%' height={30} style={{margin:'auto'}}/>
                            </>
                            :
                            <>
                                <AddButton type='con' AddAction={HandleOpenArgumentDialog}/>
                                
                                {decision.cons.map((arg, index) => {
                                    return (
                                        <Argument   arg={arg}
                                                    key={index}
                                                    handleArgumentRemove={() => handleArgumentRemove(arg)}
                                                    handleEdit={()=> HandleOpenArgumentDialog('','con',arg)}
                                                    type="con"
                                        />
                                    )})
                                }      
                            </>
                        }
                    </Grid>
                </Grid>
                </div>
            </div>

                <Dialog open={showDialog}
                        fullWidth
                        classes={{paper:classes.dialogPaper}}        
                        maxWidth={'sm'}
                        TransitionComponent={Transition}
                        onClose={HandleCloseArgumentDialog} aria-labelledby="form-dialog-title"
                        >
                            <div style={{position:'relative'}}>
                                <DialogContent >
                                    <AddProCon type={type} setArgument={addProCon} text={text} edit={argumentEdit} editAction={editProCon} closeAction={HandleCloseArgumentDialog}/>
                                </DialogContent>
                            </div>
                </Dialog>
        </div>


    )
}