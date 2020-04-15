import React, {useState, useEffect,useMemo} from 'react'
import ProsConsTable from './prosConsTable'
import axios from "axios"
import Comments from './Comments/Comments'
import { useTracked  } from '../store'
import { createMuiTheme, ThemeProvider,responsiveFontSizes  } from '@material-ui/core/styles';

import {BASE_URL} from './GlobalVars'

import {useParams} from "react-router-dom"

const theme = (darkMode) => responsiveFontSizes(createMuiTheme({
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

export default function Home(props) {
    const [state,dispatch] = useTracked()
    const {isDark} = state
    const decisionFromState = props.location.state && props.location.state.decision
    //const [decision, setDecision] = useState(decisionFromState?decisionFromState:null)
    //const [loading, setLoading] = useState(true)
    //const [error, setError] = useState("")


    let { id } = useParams()

    async function getDecision(decisionId) {

        try {
            
            const res = await axios.get(`${BASE_URL}/decisions/${decisionId}`)
            const decisionFromServer = res.data
            
            if (res.status === 200) {

                console.log("decisionFromServer")
                console.log(decisionFromServer)
                dispatch({type: "SET_DECISION", payload: {decision: decisionFromServer}})
            }
            
        } catch (e) {
          console.log(e.message)
          dispatch({type: "SET_ERROR", payload: {error:e.message}})

        }
    
    }

    useEffect(() => {
        if (!decisionFromState) {
            let decisionId = id || ''
            if (decisionId.length > 23)
                getDecision(decisionId)
            else
              dispatch({type: "INIT_DECISION"})
        }
        else
          console.log("decisionFromState")
          dispatch({type: "SET_DECISION", payload: {decision: decisionFromState}})
    
    }, [])

    return useMemo(() => {
    return (
        <ThemeProvider theme={theme(isDark)}>
            <div style={{background:isDark?'#35314f':'#dce8f3'}}>
            {console.log('<--render: home-->')}
            <ProsConsTable />
            <Comments />

            </div>
        </ThemeProvider>

    )},[isDark])

}