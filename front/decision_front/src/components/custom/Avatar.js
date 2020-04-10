import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    }

}))

export const Animals =
['huski','bird','chicken','bulldog','horns','leopard',
//'snowleopard',
'cat1','cat2','cat3','cat4','mouse','dog1']
export const Colors = ['#A4036F','#2DE1FC','#16DB93','#4062BB','#FF4365','#EABE2C','#605A5E']

export default function Avatar(comment) {
    const classes = useStyles()

    function getRandomPic(){
        return Animals[Math.floor(Math.random() * Animals.length)]
      }
      function getRandomColor(){
        return Colors[Math.floor(Math.random() * Colors.length)]
      }

    return (
        <div style={{position:'relative',width:'80px',height:'80px',marginTop:'20px'}}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
            style={{position:'absolute',width:'80px',height:'80px'}}>
                <defs>
                    <clipPath id="cut-off-bottom">
                    <rect x="0" y="0" width="80" height="60" />
                    </clipPath>
                    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor:'rgb(162,162,162)', stopOpacity:1}}/>
                    <stop offset="100%" style={{stopColor:getRandomColor(), stopOpacity:1}} />
                    </radialGradient>
                </defs>
                <circle cx="40" cy="40" r="40" fill="url(#grad1)" clipPath="url(#cut-off-bottom)" />
            </svg>
            <img src={`/avatars/${getRandomPic()}.png`} style={{position:'absolute',bottom:'20px',left:'5px',width:'70px'}} alt="avatar" />
        </div>
    )
}