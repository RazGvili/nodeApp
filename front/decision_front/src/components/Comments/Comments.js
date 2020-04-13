import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

import CommentItem from './CommentsItem'

import AddComment from './AddComment'

import axios from "axios"
import {BASE_URL} from '../GlobalVars'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center',
        margin: 'auto',
        fontFamily:'Permanent Marker'
    },
    inline: {
        display: 'inline',
    }

}))


export default function Comments({decision}) {
    const classes = useStyles()
    
    let commentsProps = decision.comments
    let decisionId = decision._id

    const [newComment, setNewComment] = useState({})
    const [comments, setComments] = useState(commentsProps)

    const [removeLastOne, setRemoveLastOne] = useState(false)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (newComment.hasOwnProperty("_id")) {
            console.log(newComment)
            setComments(comments => [...comments, newComment])
        }
    }, [newComment])

    
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

            <h2> What others think </h2>

            { comments && comments.length === 0 &&
                
                <div>
                    <h4> No comments yet.. Be the first! </h4>
                </div>
            }

            <List>

                { comments && comments.length > 0 &&
                    comments.map((comment, index) => {

                        return (
                            
                                <CommentItem 
                                    key={Math.floor(Math.random() * 999)} 
                                    comment={comment} 
                                    lastOne={newComment.hasOwnProperty("_id") && index === comments.length-1} 
                                    setRemoveLastOne={setRemoveLastOne}
                                />
                                
                        )
                    })
                }
{/* <Divider variant="inset" component="li" /> */}
            </List> 

            { error && 
                <h5 style={{color: 'red'}}> {error} </h5>
            }
            
            <AddComment decisionId={decision._id} setNewComment={setNewComment}/>

        </div>

    )
}