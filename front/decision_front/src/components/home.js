import React, {useEffect,useMemo} from 'react'
import ProsConsTable from './prosConsTable'
import axios from "axios"
import Comments from './Comments/Comments'
import rtl from 'jss-rtl';
import { create } from 'jss';


import { useTracked  } from '../store'
import { createMuiTheme, ThemeProvider,responsiveFontSizes,jssPreset,StylesProvider    } from '@material-ui/core/styles';

import {BASE_URL} from './../helpers/GlobalVars'

import {useParams} from "react-router-dom"

//import lang from './../helpers/texts'

export const theme = (darkMode,UIrtl) => responsiveFontSizes(createMuiTheme({
  direction: UIrtl,
  typography: {
      fontFamily: 'Nunito Sans, Arial',
    },
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          light: '#000000',
          main: '#000000',
          dark: '#ffffff'
        },
        secondary: {
          light:'#000000',
          main: '#000000',
          dark: '#ffffff'
        },
        background:{
          light: '#dce8f3',
          dark:'#35314f',
        },
        text:{
          //light: '#dce8f3',
          //dark:'#1e1d1e',
        }
      },
    }))

export default function Home() {
    const [state,dispatch] = useTracked()
    const {isDark,id,lang} = state
    const jss = create({ plugins: [...jssPreset().plugins, rtl({ enabled: lang === 'heb' })] });

    const UIrtl = lang === 'eng'? 'ltr': 'rtl'
    const params = useParams()
    const idFromURL= params.id

    async function getDecision(decisionId) {
        //console.log('getting decision from server')
        try {
            
            const res = await axios.get(`${BASE_URL}/decisions/${decisionId}`)
            const decisionFromServer = res.data
            
            if (res.status === 200) {

                console.log("decisionFromServer")
                //console.log(decisionFromServer)
                dispatch({type: "SET_DECISION", payload: {decision: decisionFromServer}})
            }
            
        } catch (e) {

          console.log(e.message)
          dispatch({type: "SET_ERROR", payload: {error:e.message}})
          
          if (e.hasOwnProperty("response") && e.response.hasOwnProperty("status")) { 

            if (e.response.status === 404) {
              dispatch({type: "OPEN_SNACK", payload: {type: "info", text: `We didn't find it, Sure you pasted it correctly?`}})
              dispatch({type: "INIT_DECISION"}) 
            }

          } else {
            // lang code - SNACKS_GENERAL_ERR
              dispatch({type: "INIT_DECISION"}) 
              dispatch({type: "OPEN_SNACK", payload: {type: "info", text: `Something went wrong, please try again. you're invited to leave feedback!`}})  
          }
        }
    }


    useEffect(() => {
      console.log('run effects!')

        if (!id) {
            //console.log(idFromUrl)
            let decisionId =  idFromURL || ''
            if (decisionId.length > 23)
                getDecision(decisionId)
            else {
              //dispatch({type: "OPEN_SNACK", payload: {type: "success", text: `We didn't find it, Sure you pasted the link correctly?`}})  
              dispatch({type: "INIT_DECISION"})
            }
              
        }
        else{
          console.log("decisionFromContextAfterRedirect")
          //dispatch({type: "SET_DECISION", payload: {decision: decisionFromState}})
        }
    }, [])

    return useMemo(() => {
    return (
        <ThemeProvider theme={theme(isDark,UIrtl)} >
          <StylesProvider jss={jss}>
            <div style={{background:isDark?'#35314f':'#dce8f3',minHeight:'95vh'}} dir={UIrtl}>
            {console.log('<--render: home-->')}

            <ProsConsTable />
            <Comments />

            </div>
            </StylesProvider>
        </ThemeProvider>

    )},[isDark,idFromURL,lang,jss])

}