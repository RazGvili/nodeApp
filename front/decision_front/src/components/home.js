import React, {useState, useEffect} from 'react'
import ProsConsTable from './prosConsTable'
import Header from './Header'
import Quote from './Quote'
import axios from "axios"
import Loading from "./loading"
import Timer from './timer'
import Comments from './Comments/Comments'

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://r-decisions-server.herokuapp.com/"
let decisionId = window.location.pathname.split("/").pop() || 0
const toGetDecision = decisionId.length > 23 ? true : false


function Home() {

    const [showLoader, setShowLoader] = useState(toGetDecision)
    const [decision, setDecision] = useState({})
    const [readOnly, setReadOnly] = useState(false)
    const [error, setError] = useState("")


    if (showLoader) { 
        getDecision().then((des) => {

        }).catch((e) => {
            console.log(e)
        })
    }

    async function getDecision() {

        try {
            
            const res = await axios.get(`${BASE_URL}`+"/decisions/"+decisionId)
            const decisionFromServer = res.data
            
            if (res.status === 200) {

                // console.log(`Fetched decision with ID: ` + decisionId)
                console.log(decisionFromServer)
                setDecision(decisionFromServer)
            }
            
        } catch (e) {

            console.log(e.message)
            setError(e.message)
        }
    
    }

    useEffect(() => {
        
        if (decision.hasOwnProperty("_id")) {
            console.log("d")
            setShowLoader(false)
            setReadOnly(true)
        }
        
    }, [decision])  

    console.log(!showLoader && readOnly)

    return (
        <div>

            <Header/>
            <Timer/>

            { showLoader && <Loading/>}

            { !showLoader && <ProsConsTable decision={decision} error={error} readOnly={readOnly} />}

            { !showLoader && readOnly && <Comments decision={decision}/> }

        </div>
    )

}

export default Home