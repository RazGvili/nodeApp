import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"

import Button from '@material-ui/core/Button'

import Loading from '../loading'


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://r-decisions-server.herokuapp.com/"

export default function AddComment({decisionId}) {
    const classes = useStyles()

    // ========================================

    const [title, setTitle] = useState("")

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    // ========================================

    const [name, setName] = useState("")

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    // ========================================

    const [text, setText] = useState("")

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    // ========================================
    // Server 

    const [commentUploaded, setCommentUploaded] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (commentUploaded) {
            window.location.reload()
        }
    }, [commentUploaded])

    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        let newComment = {
            title,
            name,
            text
        }

        try {
            
            const res = await axios.patch(`${BASE_URL}`+"/decisions/"+decisionId, {comments: newComment})
            
            if (res.status === 200) {

                setLoading(true)
                setCommentUploaded(true)
            }
            
        } catch (e) {
    
            console.log(e.message)
            setError(e.message)
        }
    }


    return (

        <div>

            { !loading &&

                <form noValidate autoComplete="off" onSubmit={handleSubmit}> 

                    <TextField
                        required
                        id="outlined-required"
                        label="Clearly define your decision"
                        placeholder="Should i quit my job?"
                        variant="outlined"
                        fullWidth
                        helperText="Defining and scoping is helpful"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    
                    <TextField
                        required
                        label="Name"
                        placeholder="John"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
                    />

                    <TextField
                        required
                        id="outlined-required"
                        label="Clearly define your decision"
                        placeholder="Should i quit my job?"
                        variant="outlined"
                        fullWidth
                        helperText="Defining and scoping is helpful"
                        value={text}
                        onChange={handleTextChange}
                    />

                    <Button type="submit"> Add comment </Button>

                </form>
            
            }

            { loading &&
                <Loading/>            
            }

        </div>        
    )
}