import React, {useState, useEffect} from 'react'
import ProsConsTable from './prosConsTable'
import Header from './Header'
import axios from "axios"
import Loading from "./Loading"
import Comments from './Comments/Comments'
import Avatar from './custom/Avatar'

import {BASE_URL} from './GlobalVars'

import {useParams} from "react-router-dom"

export default function Home() {

    const [decision, setDecision] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    let { slug } = useParams()

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
        let decisionId = slug || ''
        if (decisionId.length > 23)
            getDecision(decisionId)
        else
            setLoading(false)
    }, [])


    return (
        <div>

            {/* <Timer seconds={60}/> */}
            <Avatar />
            {loading?
                <Loading/>
            :
                <ProsConsTable decision={decision} error={error} />
            }
                
            { decision && !loading &&
                <Comments decision={decision}/>
            }

        </div>
    )

}