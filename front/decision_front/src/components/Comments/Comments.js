import React, {useState, useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import CommentItem from './CommentsItem'
import AddComment from './AddComment'
import { useTracked,   } from '../../store'
import { getUntrackedObject } from 'react-tracked';
import axios from "axios"
import {BASE_URL} from '../../helpers/GlobalVars'
import { Typography } from '@material-ui/core'
import useLocalStorage from '../custom/UseLocalStorage'

const useStyles = makeStyles((theme) => ({
    container:{
        width: '100%',
        marginTop:'20px',
        background:'rgba(0, 0, 0, 0.1)',
        padding:'15px'
    },
    root: {
        width: '100%',
        maxWidth: '360px',
        textAlign: 'center',
        margin: 'auto',
    },
    inline: {
        display: 'inline',
    },
    text:{
        color: theme.palette.type==='dark'?'white':'black',
    }

}))


export default function Comments() {
    const classes = useStyles()
    const [state,dispatch] = useTracked();
    let newCommentID = localStorage.getItem('newCommentID') || '';

    const [likedComments, setLikedComments] = useLocalStorage('likedComments', JSON.stringify([]));
    const [unlikedComments, setUnlikedComments] = useLocalStorage('unlikedComments', JSON.stringify([]));
    let parsedLikes = JSON.parse(likedComments)
    let parsedUnlikes = JSON.parse(unlikedComments)
    //console.log(newCommentID)
    const {comments,id,loading} = state
    const [error, setError] = useState("")

    const addToLikesStorage = (cid) => {
        let parsedLikes_ = JSON.parse(likedComments)
        parsedLikes_.push(cid)
        setLikedComments(JSON.stringify(parsedLikes_))
    }

    const addToUnlikesStorage = (cid) => {
        let parsedUnlikes_ = JSON.parse(unlikedComments) 
        parsedUnlikes_.push(cid)
        setUnlikedComments(JSON.stringify(parsedUnlikes_))
    }

    const removeFromLikesStorage = (cid) => {
        setLikedComments(JSON.stringify(parsedLikes.filter(item => item!==cid)))
    }

    const removeFromUnikesStorage = (cid) => {
        setUnlikedComments(JSON.stringify(parsedUnlikes.filter(item => item!==cid)))
    }

    const commentLikeStatus = (cid) => {
        if  (parsedLikes.includes(cid))
            return 1
        else if (parsedUnlikes.includes(cid))
            return -1
        else
            return 0
    }

    //todo:: make sure removing comment is only possible to the last one and maximum after 1 hour? (so people wont delete all)
    const handleRemoveComment = async(comment) => {
        console.log(comment)
        axios.patch(`${BASE_URL}/decisions/${id}`, {commentIdToDelete: comment._id})
            .then((res) => {
                if (res.status === 200) {
                    dispatch({type: "REMOVE_COMMENT", payload: {comment}})
                    //setLoading(false)
                }

                }).catch((e) => {
                    console.log(e.message)
                    setError(e.message)
                    //setLoading(false)
                    
                    dispatch({type: "OPEN_SNACK", payload: {type: "error", text: `Something went wrong! we couldn't delete your comment please try again.`}})
                    dispatch({type: "SET_ERROR", payload: {error:e.message}})
                })
    }

    // comment.add[bool] | comment.cid 
    const handleLikeComment = async (comment) => {
        

        axios.patch(`${BASE_URL}/decisions/${id}/comment/${comment.cid}`, {add: comment.add})
            .then((res) => {
                if (res.status === 200) {
                    console.log("comment like success")
                    dispatch({type: "OPEN_SNACK", payload: {type: "success", text: comment.add ? "Liked!" : "Unliked!"}})
                }

            }).catch((e) => {

                console.log(e.message)
                dispatch({type: "OPEN_SNACK", payload: {type: "error", text: `Something went wrong! we couldn't add your like to this comment.`}})
                dispatch({type: "SET_ERROR", payload: {error:e.message}})
            })
    }

    // const handleUnlikeComment = async (comment) => {
        
    // }


    return useMemo(() => {
    return (
        id.length>23?
        <div className={classes.container}>
        <div className={classes.root}>
            {loading?
            'loading...'
            :
            <>
            <br/>
            <Typography variant="h4" className={classes.text}> What others think </Typography>
            <br />
            {console.log('<--render comments-->')}
            {comments.length === 0?
            
                <Typography variant="h6" className={classes.text}> No comments yet.. Be the first! </Typography>
            
            :
            <List>
                    {getUntrackedObject(state.comments).map((comment, index) => 
                                <CommentItem 
                                    key={'comment'+comment._id} 
                                    comment={comment}
                                    commentLikeStatus={commentLikeStatus(comment._id)}
                                    canDelete = {newCommentID === comment._id}
                                    setRemoveLastOne={()=> handleRemoveComment(comment)}
                                    handleLikeComment={handleLikeComment}
                                    addToLikesStorage={addToLikesStorage}
                                    addToUnlikesStorage={addToUnlikesStorage}
                                    removeFromLikesStorage={removeFromLikesStorage}
                                    removeFromUnikesStorage={removeFromUnikesStorage}
                                />    
                               
                    )
                }
            </List> 
            }

            { error && 
                <h5 style={{color: 'red'}}> {error} </h5>
            }
            <br /><br />

            <AddComment decisionId={id}/>
            </>
            }
        </div>
        </div>
        :null

    )},[comments,id,loading,classes])
}