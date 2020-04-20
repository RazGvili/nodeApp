import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"
import { useDispatch  } from '../../store'

import Button from '@material-ui/core/Button'
import useLocalStorage from '../custom/UseLocalStorage'

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
            //margin:'auto',
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
    },
    textInput:{
        borderRadius:'45px'
    }
}));


export default function AddComment({decisionId}) {
    const classes = useStyles()
    const dispatch = useDispatch();
    //const [newCommentID, setNewComment] = useLocalStorage('newCommentID', '');
    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [sending,setSending] = useState(false)
    const [error,setError] = useState("")
    const [success,setSuccess] = useState(false)

    const handleNameChange = (event) => {
        
        if (event.target.value.length < 20) {
            setName(event.target.value)
        }
    }

    const handleTextChange = (event) => {
        
        if (event.target.value.length < 300) {
            setText(event.target.value)
        }
    }

    const handleAddComment = async () => {
        setSending(true)
        let newComment = {
            name,
            text
        }
        
        try {
            
            const res = await axios.patch(`${BASE_URL}/decisions/${decisionId}`, {comments: newComment})
            
            if (res.status === 200) {
                let comment = res.data.comments.pop()
                localStorage.setItem('newCommentID', comment._id);
                dispatch({type: "ADD_COMMENT", payload: {comment}})
                setSending(false)
                setSuccess(true)  
            }
            
        } catch (e) {
            setSending(false)
            console.log(e.message)
            setError(e.message)
            //setLoading(false)
        }
    }


    return (
        <div className={classes.root}>
            {success?
                 <Typography>Sent!</Typography>
            :
            sending?
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
                    <TextField
                                required
                                id="comment-text-input"
                                multiline
                                placeholder="Your comment"
                                rows={4}
                                inputProps={{  style: {padding:'0px 10px'} }}
                                InputProps={{style:{borderRadius:'30px 30px 0px 0px',padding:'15px 10px'}}}
                                variant="filled"
                                rowsMax="6"
                                fullWidth
                                value={text}
                                onChange={handleTextChange}
                    />

                    {/* //todo:: handle empty name clicking add comment */}

                    <br/><br/>
                    <div className={classes.nameSubmitContainer}>
                        <TextField
                            required
                            size="small"
                            placeholder="Name"
                            variant="filled"
                            inputProps={{  style: { textAlign: 'center',padding:'10px 0px'} }}
                            InputProps={{style:{borderRadius:'30px 30px 0px 0px',height:'40px',textAlign:'center'}}}
                            fullWidth
                            value={name}
                            style={{width:'220px'}}
                            onChange={handleNameChange}
                        />
                        {sending?
                        <Button type="submit" className={classes.submitButton} >Sending...</Button>
                        :
                        <Button type="submit" className={classes.submitButton} onClick={handleAddComment}> Add Comment</Button>
                        }
                    </div>
                </>
        }
        </div>        
    )
}