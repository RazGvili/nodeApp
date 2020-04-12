
import React from 'react'
import { Link } from 'react-router-dom'


export default function NotFound(props) {
    return (
        <div style={{width:'100%',textAlign:'center',margin:' 20px auto'}}>
            <img src="/images/404.png" alt="not found" style={{width:'50%',maxWidth:'500px'}} />
            <h1>Page not found!</h1>
            <Link to="/">
                go back
            </Link>
        </div>
    )
}