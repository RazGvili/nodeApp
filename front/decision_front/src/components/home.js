import React, {useState, useEffect} from 'react'
import ProsConsTable from './prosConsTable'
import Header from './Header'
import Quote from './Quote'
import axios from "axios"
import Loading from "./loading"
import Timer from './Timer'
import Comments from './Comments/Comments'

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://r-decisions-server.herokuapp.com/"

export default function Home() {

    const [decision, setDecision] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    // if (showLoader) { 
    //     getDecision().then((des) => {

    //     }).catch((e) => {
    //         console.log(e)
    //     })
    // }

    async function getDecision(decisionId) {

        try {
            
            const res = await axios.get(`${BASE_URL}`+"/decisions/"+decisionId)
            const decisionFromServer = res.data
            
            if (res.status === 200) {

                // console.log(`Fetched decision with ID: ` + decisionId)
                console.log(decisionFromServer)
                setDecision(decisionFromServer)
                setLoading(false)
            }
            
        } catch (e) {

            console.log(e.message)
            setError(e.message)
        }
    
    }

    useEffect(() => {
        let decisionId = window.location.pathname.split("/").pop() || 0
        if (decisionId.length > 23)
            getDecision(decisionId)
        else
            setLoading(false)
    }, [])

    return (
        <div>

            <Header/>
            {/* <Timer seconds={60}/> */}
            {loading?
                <Loading/>
            :
                <ProsConsTable decision={decision} error={error} />
            }
                
            {decision &&
                <Comments decision={decision}/>
            }

        </div>
    )

}