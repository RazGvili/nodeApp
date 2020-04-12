import React, {useState, useEffect} from 'react'
import ProsConsTable from './prosConsTable'
import axios from "axios"
import Comments from './Comments/Comments'
import Avatar from './custom/Avatar'

import {BASE_URL} from './GlobalVars'

import {useParams} from "react-router-dom"

export default function Home(props) {
    const decisionFromState = props.location.state && props.location.state.decision
    console.log(decisionFromState)
    const [decision, setDecision] = useState(decisionFromState?decisionFromState:null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [decisionIfSuccess, setDecisionIfSuccess] = useState(false)


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

    useEffect(() => {
        
        if (decisionIfSuccess) {

            let decisionId = id || ''
            if (decisionId.length > 23)
                getDecision(decisionId)
            else
                setLoading(false)
        }
        
    }, [decisionIfSuccess])

    return (
        <div>
            {/* <Avatar /> */}

            <ProsConsTable loading={loading} decisionFromUrl={decision} errorAbove={error} setDecisionIfSuccess={setDecisionIfSuccess}/>
            
                
            { decision && !loading &&
                <Comments decision={decision}/>
            }

        </div>
    )

}