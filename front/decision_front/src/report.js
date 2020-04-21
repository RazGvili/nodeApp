
import axios from "axios"
import {BASE_URL} from './components/GlobalVars'

export default function(err) {
    console.log(err)

    axios.post(`${BASE_URL}/decisions/error`, {errorMessage: err})
    .then((d) => {
        console.log(d)
    }).catch(e => console.error(e))
}