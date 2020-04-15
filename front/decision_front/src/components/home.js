import React, {useState, useEffect,useContext} from 'react'
import ProsConsTable from './prosConsTable'
import axios from "axios"
import Comments from './Comments/Comments'
import { useTrackedState  } from '../store'
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
    const state = useTrackedState();
    const darkMode = state.isDark

    const decisionFromState = props.location.state && props.location.state.decision
    const [decision, setDecision] = useState(decisionFromState?decisionFromState:null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    let { id } = useParams()

    async function getDecision(decisionId) {

        try {
            
            const res = await axios.get(`${BASE_URL}/decisions/${decisionId}`)
            const decisionFromServer = res.data
            
            if (res.status === 200) {

                console.log(decisionFromServer)
                setDecision(decisionFromServer)
                setLoading(false)

            }
            
        } catch (e) {

            console.log(e.message)
            setError(e.message)
            setLoading(false)

        }
    
    }

    useEffect(() => {
        if (!decisionFromState) {
            let decisionId = id || ''
            if (decisionId.length > 23)
                getDecision(decisionId)
            else
                setLoading(false)
        }
        else
            setLoading(false)
    }, [])

    return (
        <ThemeProvider theme={theme(darkMode)}>
            <div style={{background:darkMode?'#35314f':'#dce8f3'}}>

            <ProsConsTable loading={loading} decisionFromUrl={decision} errorAbove={error} />
            
            { decision && !loading &&
                <Comments decision={decision}/>
            }
            </div>
        </ThemeProvider>

    )

}