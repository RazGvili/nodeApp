import React, {useState, useEffect} from 'react'
import ProsConsTable from './prosConsTable'
import Header from './Header'
import Quote from './Quote'
import axios from "axios"
import Loading from "./loading"


const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://r-decisions-server.herokuapp.com/"
let decisionId = window.location.pathname.split("/").pop() || 0
const toGetDecision = decisionId.length > 23 ? true : false

function Home() {

    const [showLoader, setShowLoader] = useState(toGetDecision)
    const [decision, setDecision] = useState({})

    if (showLoader) { 
        getDecision().then((des) => {

            setShowLoader(false)

        }).catch((e) => {
            console.log(e)
        })
    }

    async function getDecision() {

        try {
            
            const res = await axios.get(`${BASE_URL}`+"/decisions/"+decisionId)
            const addedDecision = res.data
        
            console.log(`Added a new decision!`, addedDecision)
    
            return addedDecision      

        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div>

            <Header/>

            { showLoader && <Loading/>}
            { !showLoader && <ProsConsTable/>}

        </div>
    )

}

export default Home