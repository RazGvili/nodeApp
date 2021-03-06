
import React, { useState, useMemo } from "react"
//import axios from "axios"
import {makeStyles} from "@material-ui/core/styles"
import { Skeleton } from "@material-ui/lab"
import {useMediaQuery,Slide,Grid,Dialog,DialogContent} from '@material-ui/core'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import AddProCon from './main/AddProCon'
import AddButton from './main/AddButton'
import Title from "./main/Title"
import Header from "./header/Header"
import ChoicesData from "./decisionCalc/ChoicesData"
import Argument from "./main/Argument"
//import {BASE_URL} from './GlobalVars'
import { useTracked } from '../store'
import Icon from "@mdi/react";
import { ICONS } from "./custom/IconsData";
import { green, red } from "../helpers/GlobalVars";
import {lang as texts} from '../helpers/texts' 

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
    speedDial: {
        position: 'fixed',
        bottom:'10%',
        right: '0',
    left: '0',
    marginRight: 'auto',
    marginLeft: 'auto',
    minHeight: '10em',
    width: '90%',
      },
    blackBoard:
    props=> theme.palette.type==='dark'?
    {
        background:'#323132',
        maxWidth:'1000px',
        borderRadius:'15px',
        position:'relative',
        minHeight:'540px',
        margin:'10px auto',
        fontFamily:'Permanent Marker,Varela Round',
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
        fontFamily:'Permanent Marker,Varela Round',
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
    mobileHorizontalLine:{
        marginTop:'80px',
        maxWidth:'90%',
        maxHeight:'100%',
    },
    blackBoardTitle:{
        fontFamily:'Permanent Marker,Varela Round',
        height:'3.5em',
        fontSize:'40px',
        paddingTop:'0.7em'
    },
    boardContainer:{
        padding:'10px'
    },
    titleContainer:{
        margin:'10px auto'
    },
    dialogPaper:{
        background:theme.palette.type==='dark'?theme.palette.background.dark:theme.palette.background.light,
    },
    greenToolTip:{
        background:green,
        width:'70px'
    },
    redToolTip:{
        background:red,
        width:'70px'
    },
    addFab:{
        background:theme.palette.type==='dark'?theme.palette.background.light:theme.palette.background.dark,
        '&:active':{
            background:theme.palette.type==='dark'?theme.palette.background.light:theme.palette.background.dark,
        },
        '&:hover':{
            background:theme.palette.type==='dark'?theme.palette.background.light:theme.palette.background.dark,
        }
    }
}))

export default function ProsConsTable() {
    //const theme = useTheme();
    const [state,dispatch] = useTracked();
    const {isDark,cons,pros,loading,isReadOnly, deletedArg,lang} = state
    //let styleProps = {DARK_MODE:DARK_MODE}
    const classes = useStyles()
    const smallScreen = useMediaQuery('(max-width:600px)')
    const [argumentEdit, setArgumentEdit] = useState(null)
    //const [argIdCounter,setArgIdCounter] = useState(0)
    const [showDialog, setShowDialog] = useState(false)
    const [speedDial, setSpeedDial] = useState(false)
    const [type, setType] = useState("")
    const [text, setText] = useState("")
    //const [error, setError] = useState("")

    function handleArgumentRemove(arg) {
        dispatch({type: "PRO_CON_REMOVE", payload: {arg}})
        setTimeout( () => {
            dispatch({type: "OPEN_SNACK", payload: {type: "info", text: "Argument deleted successfully", snackAdditionalInfo: "remove"}})
        }
        , 600)
    }
    
    
    const addProCon = (arg) => {
        arg.id = state.pros.length + state.cons.length + 1
        //setArgIdCounter(argIdCounter + 1)
        dispatch({type: "PRO_CON_ADD", payload: {arg}})
        setArgumentEdit(null)
        setShowDialog(false)
        setText('')
    }


    const editProCon = (arg) => {
        setArgumentEdit(null)
        dispatch({type: "PRO_CON_EDIT", payload: {arg}})

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

    return useMemo(() => {
    return (

        <div className={classes.root}>
            {console.log('<--render: table -->')}
            

            <Header />

            <div className={classes.titleContainer}>
            {loading?
            <Skeleton animation="wave" width='50%' height={100} style={{margin:'auto'}}/>
            :
            <>  
                <Title/>
                <br/>
            </>
            }
            </div>

            <ChoicesData  loading={loading} cons={cons} pros={pros}/>
            <br/>

            <div className={classes.boardContainer}>
            <div className={classes.blackBoard}>
            {!smallScreen && <>
                <img className={classes.blackBoardHorizontalLine} alt="chalk line" src={`/images/chalk_sides${isDark?'':'_black'}.png`} />
                <img className={classes.blackBoardVerticalLine} alt="chalk line" src={`/images/chalk_updown${isDark?'':'_black'}.png`} />
                </>
            }
                <Grid container >
                    
                    <Grid item xs={12} sm={6} className={classes.blackBoardTitle} style={{color:'#87BA55'}}>
                        {texts[lang]['TABLE_PRO_TITLE']}
                    </Grid>

                    {!smallScreen &&
                    <Grid item xs={6} className={classes.blackBoardTitle} style={{color:'#BA3737'}}>
                        {texts[lang]['TABLE_CON_TITLE']}
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
                            {!isReadOnly && !smallScreen && <AddButton type='pro' AddAction={HandleOpenArgumentDialog} lang={lang} />}
                                {
                                    pros.map((arg, index) => {
                                        return (
                                            <Argument
                                            arg={arg}
                                            isReadOnly={isReadOnly}
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
                        <>
                            <Grid item xs={12}>
                                <img className={classes.mobileHorizontalLine} alt="chalk line" src={`/images/chalk_sides${isDark?'':'_black'}.png`} />
                            </Grid> 
                            <Grid item xs={12} className={classes.blackBoardTitle} style={{color:'#BA3737'}}>
                                {texts[lang]['TABLE_CON_TITLE']}
                            </Grid> 
                        </>
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
                                {!isReadOnly && !smallScreen && <AddButton type='con' AddAction={HandleOpenArgumentDialog} lang={lang} /> }
                                
                                {cons.map((arg, index) => {
                                    return (
                                        <Argument   arg={arg}
                                                    key={index}
                                                    isReadOnly={isReadOnly}
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
                                    <AddProCon type={type} lang={lang} setArgument={addProCon} text={text} edit={argumentEdit} editAction={editProCon} closeAction={HandleCloseArgumentDialog}/>
                                </DialogContent>
                            </div>
                </Dialog>

                {smallScreen &&
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    classes={{fab:classes.addFab}}
                    icon={<SpeedDialIcon style={{color:isDark?'black':'white'}}/>}
                    onClose={() => setSpeedDial(false)}
                    onOpen={() => setSpeedDial(true)}
                    //FabProps={{disableRipple:true}}
                    open={speedDial}
                >
          <SpeedDialAction
            //key={'Addcon2'}
            FabProps={{style:{background:red}}}
            classes={{staticTooltipLabel:classes.redToolTip}}
            icon={<Icon path={ICONS['Unlike']} size={1} />}
            tooltipTitle={'Add con'}
            tooltipOpen
            onClick={()=> HandleOpenArgumentDialog('', 'con')}
          />
          <SpeedDialAction
            FabProps={{style:{background:green}}}
            classes={{staticTooltipLabel:classes.greenToolTip}}
            //key={'Addcon'}
            icon={<Icon path={ICONS['Like']} size={1} />}
            tooltipTitle={'Add pro'}
            tooltipOpen
            onClick={()=> HandleOpenArgumentDialog('', 'pro')}
          />
          
      </SpeedDial>}

        </div>

    )},[isDark,cons,pros,lang,loading,classes,smallScreen,showDialog,type,text,isReadOnly,speedDial,deletedArg])
}