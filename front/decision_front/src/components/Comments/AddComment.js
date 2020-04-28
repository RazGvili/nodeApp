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
            height:'40px',
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
    },
    text:{
        color: theme.palette.type==='dark'?'white':'black',
        fontSize:'17PX',
        fontWeight:'700'
    }
}));


export default function AddComment({decisionId,threadID=''}) {
    const classes = useStyles()
    const dispatch = useDispatch();
    //const [newCommentID, setNewComment] = useLocalStorage('newCommentID', '');
    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [sending,setSending] = useState(false)
    const [success,setSuccess] = useState(false)
    const nameProblem = name && name.length<3? true : false
    const textProblem = text && text.length<10? true : false
    
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
        if (!nameProblem && !textProblem){
        setSending(true)
        let newComment = {
            name,
            text,
            threadID,
            likes: 0
        }
        
        try {
            
            const res = await axios.patch(`${BASE_URL}/decisions/${decisionId}`, {newComment: newComment})
            //todo::handle error
            if (res.status === 200) {
                let comment = res.data.comments.pop()
                localStorage.setItem('newCommentID', comment._id);
                dispatch({type: "ADD_COMMENT", payload: {comment}})
                
                setSuccess(true)  
            }
            setSending(false)
        } catch (e) {
            setSending(false)
            console.error(e)
            //setLoading(false)
            dispatch({type: "OPEN_SNACK", payload: {type: "error", text: `Something went wrong! please try again.`}})
            dispatch({type: "SET_ERROR", payload: {error:e.message}})
        }
    }
    }


    return (
        <div className={classes.root}>

            {success?
                <Typography className={classes.text}>Added!</Typography>
            :
            sending?
                <Typography className={classes.text}>Loading...</Typography>
            :   
                <>
                    <Typography className={classes.text}>
                        Add your Comment
                    </Typography>
                    <br />
                    <TextField
                                required
                                id="comment-text-input"
                                multiline
                                placeholder="Your comment"
                                rows={4}
                                error={textProblem}
                                helperText={textProblem?'Comment must be longer than 10 characters':''}
                                inputProps={{  style: {padding:'0px 10px'} }}
                                InputProps={{style:{borderRadius:'30px 30px 0px 0px',padding:'15px 10px'}}}
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
                            size="small"
                            error={nameProblem}
                            helperText={nameProblem?'Name must be longer':''}
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