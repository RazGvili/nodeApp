import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"

import Button from '@material-ui/core/Button'

import Loading from '../Loading'

import {BASE_URL} from '../GlobalVars'


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        
    },
}));


export default function AddComment({decisionId, setNewComment}) {

    const classes = useStyles()

    // ========================================

    const [title, setTitle] = useState("")

    const handleTitleChange = (event) => {

        if (event.target.value.length < 30) {
            setTitle(event.target.value)
        }
        
    }

    // ========================================

    const [name, setName] = useState("")

    const handleNameChange = (event) => {
        
        if (event.target.value.length < 30) {
            setName(event.target.value)
        }
    }

    // ========================================

    const [text, setText] = useState("")

    const handleTextChange = (event) => {
        
        if (event.target.value.length < 100) {
            setText(event.target.value)
        }
    }

    // ========================================
    // Server 

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [newCommentSuccess, setNewCommentSuccess] = useState({})


    useEffect(() => {
        if (newCommentSuccess.hasOwnProperty("_id")) {
            setNewComment(newCommentSuccess)
        }
    }, [newCommentSuccess])

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

                setLoading(false)
                setNewCommentSuccess(res.data.comments.pop())
            }
            
        } catch (e) {
    
            console.log(e.message)
            setError(e.message)
            setLoading(false)

        }
    }


    return (

        <div>

            { !loading && !error &&

                <div>

                    <br/>

                    <h4 style={{fontFamily:'Permanent Marker'}}> What do you think? </h4>

                    <form noValidate autoComplete="off" onSubmit={handleSubmit}> 

                        <TextField
                            required
                            label="My name is"
                            placeholder="John"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={handleNameChange}
                        />

                        <br/><br/>
                        
                        <TextField
                            required
                            label="Consider this maybe.."
                            placeholder="Consider this maybe.."
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={handleTitleChange}
                        />

                        <br/><br/>

                        <TextField
                            required
                            label="Because of.."
                            placeholder="Because of.."
                            variant="outlined"
                            fullWidth
                            multiline
                            rowsMax="6"
                            value={text}
                            onChange={handleTextChange}
                        />

                        <br/><br/>

                        <Button type="submit" style={{fontFamily:'Permanent Marker'}}> Add </Button>

                    </form>

                    <br/><br/><br/>

                </div>
            }

            { loading &&
                <Loading/>            
            }

            { error &&
                <div>
                    <h3 style={{color: 'red'}}>{error}</h3>
                    <Button style={{fontFamily:'Permanent Marker'}} onClick={() => {window.location.reload()}}> Try refreshing </Button>
                    <br/><br/><br/>
                </div>
            }

        </div>        
    )
}