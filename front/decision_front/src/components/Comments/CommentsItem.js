import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {ICONS} from '../custom/IconsData'
import Icon from '@mdi/react'
import Avatar from '../custom/Avatar'
import { Grid, Typography,IconButton } from '@material-ui/core'
import { green,red } from '../GlobalVars'

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '460px',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    container:{
        display:'flex',
        position:'relative'
    },
    bubbleContainer:{
        float: 'left',
  width: '100%',
  marginBottom: '1em',
    },
    BubbleText:{
      //borderBottom:'2px solid grey',
    boxSizing: 'border-box',
    float: 'left',
    width: '100%',
    backgroundColor: '#C0CAD4',
	borderRadius: '45px',
	display: 'inline-block',
	marginBottom: '2em',
	padding: '1em',
	position: 'relative',

    },
    tail:{
      //:'2px solid grey',
    height: '25px',
    width: '25px',
    background: '#C0CAD4',
    position: 'absolute',
    left: '-10px',
    top: '50px',
    borderRadius: '50%',
    '&:before':{
      //borderBottom:'2px solid grey',
      height: '12px',
      width: '12px',
      background: '#C0CAD4',
      content: `''`,
      display: 'block',
      borderRadius: '50%',
      position: 'absolute',
      left: '-10px',
      bottom: '-4px',
    }
    },
    name:{
        color:theme.palette.type==='light'?'black':'white',
        fontWeight:'700',
        position: 'absolute',
        left: '0px',
        width: '60px',
        top: '105px',
        fontSize: '11px'
    },
    gradeContainer:{
      width: '80px',
      textAlign: 'right',
      height: 'fit-content',
      padding: '0px 0px 0px 30px',
      background: 'aliceblue',
      marginTop: '10px',
      marginLeft: '-90px',
      borderRadius: '0px 25px 25px 0px',
    },
    gradeButtonUp:{
      background:'aliceblue',
      paddingRight: '10px',
      marginBottom:'-2px',
      borderRadius: '0px 25px 0px 0px',
      '&:hover':{
        background:'rgba(135, 185, 85, 0.5)'
      }
    },
    gradeButtonDown:{
      background:'aliceblue',
      
      paddingRight: '10px',
      borderRadius: '0px 0px 25px 0px',
      '&:hover':{
        background:'rgba(185, 55, 55, 0.5)'
      }
    }
    
}))


export default function Comments({comment, setRemoveLastOne,canDelete, handleLikeComment,
                                  commentLikeStatus,addToLikesStorage,addToUnlikesStorage,
                                  removeFromLikesStorage,removeFromUnikesStorage}) {
    const classes = useStyles()
    const {_id,text,name,date} = comment
 
    const [likeStatus, setLikeStatus] = useState(commentLikeStatus)
    const [commentsLikes, setCommentsLikes] = useState(comment.likes)


    const likeComment = () => {
      if (likeStatus<1){
        if (likeStatus===0){
          setLikeStatus(1)
          addToLikesStorage(_id)
        }
        else{
          setLikeStatus(0)
          removeFromUnikesStorage(_id)
        }
  
        setCommentsLikes(commentsLikes+1)
        handleLikeComment({add: true, cid: _id})
      }
    }

    const unlikeComment = () => {
      if (likeStatus>-1){
        if (likeStatus===0){
          setLikeStatus(-1)
          addToUnlikesStorage(_id)
        }
        else{
          setLikeStatus(0)
          removeFromLikesStorage(_id)
        }
          

        setCommentsLikes(commentsLikes-1)
        handleLikeComment({add: false, cid: _id})
      }
    }

    return (

        <div className={classes.container}>
            <Grid container>
                <Grid item xs={2} style={{position:'relative',paddingTop:'40px'}}>
                  
                    <Avatar commentID={_id} name={name}/>
                    <Typography className={classes.name}>
                    {name}
                        </Typography> 
                    
                </Grid>

                <Grid item xs={10} style={{textAlign:'left',padding:'10px 10px 0px'}} >
                
                    <div className={classes.bubbleContainer}>
                    <div className={classes.BubbleText}>
                    <b>{text}</b><br />
                    <Typography style={{color:'grey',fontSize:'12px'}}>
                    {timeSince(new Date(date))} ago
                    </Typography>
                    <div className={classes.tail} />
                    </div>
                    </div>
                </Grid>                
            </Grid>
            { canDelete && 
                    
                    <IconButton  onClick={()=>setRemoveLastOne()} style={{
                        position: 'absolute',
                        right: '0px',
                        bottom: '16px',
                        }}>
                        <Icon   
                            path={ICONS['Remove']}
                            title="Save"
                            size={0.9}
                        />
                    </IconButton>
                
            }

            <div className={classes.gradeContainer}>

              <div className={classes.gradeButtonUp} onClick={likeComment}>
                  <Icon path={ICONS['ArrowUp']} size={0.6} color={likeStatus>0?green:'grey'}/>
              </div>
                    
              <Typography style={{fontSize:'13px',fontWeight:'700',paddingRight: '9px',
                                  color:likeStatus>0?green:likeStatus<0?red:'grey'}}>
                                    {commentsLikes}
                                </Typography>

              <div className={classes.gradeButtonDown} onClick={unlikeComment}>
                  <Icon path={ICONS['ArrowDown']} size={0.6} color={likeStatus<0?red:'grey'} />
              </div>

            </div>

        </div>
    )
}   