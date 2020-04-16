import React, {useState, useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import CommentItem from './CommentsItem'
import AddComment from './AddComment'
import { useTracked,   } from '../../store'
import { getUntrackedObject } from 'react-tracked';
import axios from "axios"
import {BASE_URL} from '../GlobalVars'
import { Typography } from '@material-ui/core'
import useLocalStorage from '../custom/UseLocalStorage'

const useStyles = makeStyles((theme) => ({
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
    //console.log(newCommentID)
    const {comments,id,loading} = state
    const [error, setError] = useState("")


    //todo:: make sure removing comment is only possible to the last one and maximum after 1 hour? (so people wont delete all)
    const handleRemoveComment = async(comment) => {
        axios.patch(`${BASE_URL}/decisions/${id}`, {comments: 'delete'})
            .then((res) => {
                if (res.status === 200) {
                    dispatch({type: "REMOVE_COMMENT", payload: {comment}})
                    //setLoading(false)
                }

                }).catch((e) => {
                    console.log(e.message)
                    setError(e.message)
                    //setLoading(false)
                })
    }

    const handleLikeComment = async(comment) => {
        
    }

    const handleUnlikeComment = async(comment) => {
        
    }


    return useMemo(() => {
    return (
        id.length>23?
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
                                    canDelete = {newCommentID === comment._id}
                                    setRemoveLastOne={()=> handleRemoveComment(comment)}
                                />    
                               
                    )
                }
            </List> 
            }

            { error && 
                <h5 style={{color: 'red'}}> {error} </h5>
            }
            <br /><br />
            <Typography style={{fontSize:'17PX',fontWeight:'700'}} className={classes.text}>
                Add your Comment
            </Typography>

            <AddComment decisionId={id}/>
            </>
            }
        </div>
        :null

    )},[comments,id,loading,classes])
}