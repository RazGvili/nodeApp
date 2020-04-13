import React, {useState, useEffect} from 'react'
import { makeStyles,useTheme } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import CommentItem from './CommentsItem'
import AddComment from './AddComment'

import axios from "axios"
import {BASE_URL} from '../GlobalVars'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        textAlign: 'center',
        margin: 'auto',
    },
    inline: {
        display: 'inline',
    },
    text:{
        color: props=> props.DARK_MODE?'white':'black',
    }

}))


export default function Comments({decision}) {
    const theme = useTheme();
    const DARK_MODE = theme.palette.type==='dark';
    let styleProps = {DARK_MODE:DARK_MODE}
    const classes = useStyles(styleProps)
    
    let commentsProps = decision.comments
    console.log(commentsProps)
    let decisionId = decision._id

    const [newComment, setNewComment] = useState({})
    const [comments, setComments] = useState(commentsProps)

    const [removeLastOne, setRemoveLastOne] = useState(false)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleCommentAdd = (newComment) => {
        if (newComment.hasOwnProperty("_id")) {
            console.log(newComment)
            setComments(comments => [...comments, newComment])
        }
    }

    
    useEffect(() => {

        if (removeLastOne) {
                
                setLoading(true)

                axios.patch(`${BASE_URL}`+"/decisions/"+decisionId, {comments: 'delete'})
                .then((res) => {

                    if (res.status === 200) {

                        setComments(comments => comments.slice(0,comments.length-2))
                        setNewComment({})   
                        setLoading(false)
                    }

                }).catch((e) => {
                    console.log(e.message)
                    setError(e.message)
                    setLoading(false)
                })
        }
    }, [removeLastOne])

    return (
        <div className={classes.root}>
            <br/>
            <Typography variant="h4" className={classes.text}> What others think </Typography>
            <br />
            {comments.length === 0?
            
                <Typography variant="h6" className={classes.text}> No comments yet.. Be the first! </Typography>
            
            :
            <List>
                    {comments.map((comment, index) => {

                        return (
                            
                                <CommentItem 
                                    key={'comment'+Math.floor(Math.random() * 9999)} 
                                    comment={comment}
                                    lastOne={newComment.hasOwnProperty("_id") && index === comments.length-1} 
                                    setRemoveLastOne={setRemoveLastOne}
                                />
                                
                        )
                    })
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
            <AddComment decisionId={decision._id} addNewComment={handleCommentAdd}/>

        </div>

    )
}