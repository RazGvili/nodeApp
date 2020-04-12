import React from "react"
import {makeStyles} from "@material-ui/core/styles"

const DARK_MODE=true

const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        //maxWidth:'1000px',
        textAlign: 'center',
        //margin: '10px auto'
    }, 
    blackBoard:
    DARK_MODE?
    {
        background:'#323132',
        maxWidth:'1000px',
        borderRadius:'15px',
        position:'relative',
        minHeight:'540px',
        margin:'10px auto',
        fontFamily:'Permanent Marker',
        border: 'tan solid 12px',
		borderTop: '#bda27e solid 12px',
		borderLeft: '#b19876 solid 12px',
		borderBottom: '#c9ad86 solid 12px',
		boxShadow: '0px 0px 6px 5px rgba(58, 18, 13, 0), 0px 0px 0px 2px #c2a782, 0px 0px 0px 4px #a58e6f, 3px 4px 8px 5px rgba(0, 0, 0, 0.5)',
		backgroundImage: 'radial-gradient( circle at left 30%, rgba(34, 34, 34, 0.3), rgba(34, 34, 34, 0.3) 80px, rgba(34, 34, 34, 0.5) 100px, rgba(51, 51, 51, 0.5) 160px, rgba(51, 51, 51, 0.5)), linear-gradient( 215deg, transparent, transparent 100px, #222 260px, #222 320px, transparent), radial-gradient( circle at right, #111, rgba(51, 51, 51, 1))',
    }
    :
    {
        background:'#F2F2F2',
        maxWidth:'1000px',
        borderRadius:'15px',
        position:'relative',
        minHeight:'540px',
        margin:'10px auto',
        fontFamily:'Permanent Marker',
        border: '#C3BEBE solid 12px',
		borderTop: '#ADA6A6 solid 12px',
		borderLeft: '#989292 solid 12px',
		borderBottom: '#BBB6B6 solid 12px',
		boxShadow: '0px 0px 6px 5px rgba(58, 18, 13, 0), 0px 0px 0px 2px #ADA6A6, 0px 0px 0px 4px #989292, 3px 4px 8px 5px rgba(0, 0, 0, 0.5)',
    },

    boardContainer:{
        padding:'10px'
    }
}))


export default function Loading() {
    const classes = useStyles()

    return (
        <div className={classes.boardContainer}>
        <div className={classes.blackBoard}>


            </div>
            </div>
    )
}