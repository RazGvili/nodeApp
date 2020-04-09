import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

import CommentItem from './CommentsItem'

import AddComment from './AddComment'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center',
        margin: 'auto'
    },
    inline: {
        display: 'inline',
    }

}))


export default function Comments(commentsArr) {
    const classes = useStyles()

    let comments = commentsArr.commentsArr

    return (

        <div className={classes.root}>

            <List>

                {
                    comments.map((comment) => {

                        return (
                            <div>

                                <CommentItem key={comment.title} comment={comment}/>
                                <Divider variant="inset" component="li" />
                        
                            </div>
                        )
                    })
                }

            </List> 
            

            <AddComment/>

        </div>

    )
}