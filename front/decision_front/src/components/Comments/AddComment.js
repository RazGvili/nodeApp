import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"

import Button from '@material-ui/core/Button'

import {BASE_URL} from '../GlobalVars'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom:'50px'
    },
    nameSubmitContainer:{
        display:'flex',
        justifyContent:'space-between'
    },
    submitButton:{
            margin:'auto',
            color:theme.palette.type==='light'?theme.palette.background.light:theme.palette.background.dark,
            background:theme.palette.type==='light'?theme.palette.background.dark:theme.palette.background.light,
            borderRadius:'30px',
            width:'120px',
            textTransform: 'none',
            fontSize:'14px',
            fontWeight:'700',
            '&:hover': {
                color:theme.palette.type==='light'?theme.palette.background.dark:theme.palette.background.light,
                background:theme.palette.type==='light'?theme.palette.background.light:theme.palette.background.dark
              },
    }
}));


export default function AddComment({decisionId, addNewComment}) {

    const classes = useStyles()

    // ========================================

    const [title, setTitle] = useState("bla bla bla")

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

    const handleNewComment = (newComment) => {
        if (newComment.hasOwnProperty("_id"))
            addNewComment(newComment)
    }
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
            
            const res = await axios.patch(`${BASE_URL}/decisions/${decisionId}`, {comments: newComment})
            
            if (res.status === 200) {

                setLoading(false)
                handleNewComment(res.data.comments.pop())
            }
            
        } catch (e) {
    
            console.log(e.message)
            setError(e.message)
            setLoading(false)

        }
    }


    return (
        <div className={classes.root}>
            {loading?
            <Typography>loading...</Typography>
            :
            error?
            <>
            <h3 style={{color: 'red'}}>{error}</h3>
            <Button style={{fontFamily:'Permanent Marker'}} onClick={() => {window.location.reload()}}> Try refreshing </Button>
            </>
            :   
            <>
            <br />
            <form noValidate autoComplete="off" onSubmit={handleSubmit}> 

                        <TextField
                                    required
                                    id="comment-text-input"
                                    label="write what you think"
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    rowsMax="6"
                                    fullWidth
                                    value={text}
                                    onChange={handleTextChange}
                        />

                        
                        

                        <br/><br/>
                        <div className={classes.nameSubmitContainer}>
                        <TextField
                            required
                            label="Name"
                            size="small"
                            //placeholder="John"
                            variant="filled"
                            fullWidth
                            value={name}
                            style={{width:'220px'}}
                            onChange={handleNameChange}
                        />
                        <Button type="submit" className={classes.submitButton}> Add Comment</Button>
                        </div>

                    </form>
                </>
            }

        </div>        
    )
}