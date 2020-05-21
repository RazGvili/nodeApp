
import React, { useState } from "react"

import {makeStyles,withStyles,useTheme} from "@material-ui/core/styles"
import {Slider,Button, Grid,TextField,Tooltip
    //Switch
} from '@material-ui/core'
import { green,red,darkGrey } from "../../helpers/GlobalVars"
import Icon from "@mdi/react"
import { ICONS } from "../custom/IconsData"

import {lang as texts} from '../../helpers/texts'


const sliderTextWidth=['','200','400','600','700','900']

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


const CustomTextField = withStyles({
    root: {
        
      '& label.Mui-focused': {
        color: red,
      },
      '& .MuiInput-underline': {
        borderBottomColor: props => props.linecolor,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: props => props.linecolor,
      },
      '& .MuiInputBase-input':{
        fontSize:'22px',
        fontWeight:600,
        
      },
      '& .MuiFilledInput-root': {
        '& fieldset': {
          borderColor: props => props.lineColor,
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: props => props.lineColor,
        },
      },
      
    },
  })(TextField);


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
        maxWidth:'400px',
        textAlign: 'center',
        margin: 'auto'
    },
    input:{
        color:props => props.DARK_MODE?'white':'black',
        //fontFamily:'Permanent Marker,Varela Round',
        margin:'auto',
        padding:'0px',
        width:'95%',
        fontWeight:'700',
        //textAlign:'center',
        borderRadius:'5px',
        
        background:props => props.DARK_MODE?'rgba(255, 255, 255, 0.1)':'rgba(0, 0, 0, 0.1)'
    },
    actionButtonPro:{
        margin:'0px 2.5px 10px',
        color:'white',
        background:green,
        borderRadius:'30px',
        width:'150px',
        textTransform: 'none',
        fontSize:'18px',
        fontWeight:'700',
        '&:hover': {
            background:'#577836'
          },
    },
    actionButtonCon:{
        margin:'0px 2.5px 10px',
        color:'white',
        background:red,
        borderRadius:'30px',
        width:'150px',
        textTransform: 'none',
        fontSize:'18px',
        fontWeight:'700',
        '&:hover': {
            background:'#932b2b'
          },
    },
    cancelButton:{
        margin:'0px 2.5px 10px',
        color:props => props.DARK_MODE?'white':darkGrey,
        //background:red,
        borderRadius:'30px',
        width:'150px',
        textTransform: 'none',
        fontSize:'18px',
        fontWeight:'700',
        '&:hover': {
            background:'#838383',
            color:'white'
          },
    },
    toolTipIcon:{
        verticalAlign: 'middle',
         paddingRight: '5px',
         opacity:'0.7'
    },
    toolTipText:{
        fontSize:'30'
    },
    endIcon1:{
        marginRight: '8px',  marginLeft: '-4px'
    }
}))


export default function AddProCon(props) {
    
    const theme = useTheme();
    const DARK_MODE = theme.palette.type==='dark';
    let styleProps = {DARK_MODE:DARK_MODE}
    const classes = useStyles(styleProps)
    //const [type, setType] = useState(props.type)
    const {type,edit,lang } = props
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
            //_id: edit && edit._id?edit._id:0,
            id: edit && edit.id?edit.id :0
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

                <CustomTextField    fullWidth
                                    className={classes.input}
                                    margin="normal"
                                    value={text}
                                    placeholder={type === 'pro'? texts[lang]['TABLE_PRO_PLACEHOLDER']:texts[lang]['TABLE_CON_PLACEHOLDER']}
                                    multiline
                                    rowsMax={10}
                                    linecolor={typeColor}
                                    onChange={handleTextChange}
                                    inputProps={{  style: {fontFamily:'Permanent Marker,Varela Round', textAlign: 'center',fontWeight:'500'} }}
                                    />

                <div className={classes.sliders}>  

                <Grid container spacing={1} style={{margin:'15px auto',width:'100%'}} direction={lang==='heb'?'row-reverse':'row'}>
                    <Grid item xs={6} style={{textAlign:lang==='eng'?'left':'right'}}>
                    {texts[lang]['ARG_POPUP_FIRST_ROW_PARAM']} 
            <Tooltip title={<span style={{fontSize:'18px'}}>{texts[lang]['ARG_POPUP_IMPACT_TOOLTIP']}</span>} >
                            <Icon path={ICONS['Question']} size={0.8} className={classes.toolTipIcon} />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontWeight:sliderTextWidth[impact]}}>
                        {texts[lang]['SLIDER_TEXTS'][impact]}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomSlider
                            style={{color: typeColor}}
                            value={impact}
                            onChange={handleImpactChange}
                        />
                    </Grid>

                    <Grid item xs={6} style={{textAlign:lang==='eng'?'left':'right'}}>
                        {texts[lang]['ARG_POPUP_SECOND_ROW_PARAM']}
                        <Tooltip title={<span style={{fontSize:'18px'}}>{texts[lang]['ARG_POPUP_CONFIDENCE_TOOLTIP']}</span>} >
                            <Icon path={ICONS['Question']} size={0.8} className={classes.toolTipIcon} />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontWeight:sliderTextWidth[confidence]}}>
                        {texts[lang]['SLIDER_TEXTS'][confidence]}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomSlider
                            style={{color: typeColor}}
                            value={confidence}
                            onChange={handleConfidenceChange}
                        />
                    </Grid>

                    <Grid item xs={6} style={{textAlign:lang==='eng'?'left':'right'}}>
                    {texts[lang]['ARG_POPUP_THIRD_ROW_PARAM']}
                    <Tooltip title={<span style={{fontSize:'18px'}}>{texts[lang]['ARG_POPUP_LONG_TERM_EFFECTS_TOOLTIP']}</span>} >
                        <Icon path={ICONS['Question']} size={0.8} className={classes.toolTipIcon} />
                    </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontWeight:sliderTextWidth[effects]}}>
                            {texts[lang]['SLIDER_TEXTS'][effects]}
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
                    endIcon={lang==='heb'?<Icon size={1} path={edit? ICONS['Edit']: ICONS['PlusOutline']} color={text.length < 2 ? "#ffffff4d" : "white"}/>:null}
                    startIcon={lang==='eng'?<Icon size={1} path={edit? ICONS['Edit']: ICONS['PlusOutline']} color={text.length < 2 ? "#ffffff4d" : "white"}/>:null}
                    onClick={addProCon}
                    classes={{endIcon:classes.endIcon1}}
                    disabled={text.length < 2 ? true : false } 
                >
                    {`${edit?texts[lang]['EDIT']:texts[lang]['ADD']} ${type==='pro'?texts[lang]['PRO']:texts[lang]['CON']} `}
                </Button>
                <Button
                    className={classes.cancelButton}
                    onClick={props.closeAction}
                    //disabled={text.length < 2 ? true : false } 
                >
                   {texts[lang]['CANCEL']}
                </Button>
       
        </div>
    )
}
