import React, {useState, useEffect} from 'react'
import ProsConsTable from './prosConsTable'
import Header from './Header'
import axios from "axios"
import Loading from "./loading"
import Timer from './timer'
import Comments from './Comments/Comments'

//import Quote from './Quote'

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://r-decisions-server.herokuapp.com/"

function Home() {

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
        let decisionId = window.location.pathname.split("/").pop() || 0
        if (decisionId.length > 23)
            getDecision(decisionId)
        else
            setLoading(false)
    }, [])


    return (
        <div>

            <Header/>
            <Timer/>
            {loading?
                <Loading/>
            :
                <ProsConsTable decision={decision} error={error} />
            }
                
            {decision && !loading &&
                <Comments decision={decision}/>
            }

        </div>
    )

}

export default Home