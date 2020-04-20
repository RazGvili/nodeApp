import React,{useMemo} from 'react'
//import { makeStyles } from '@material-ui/core/styles'


// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         maxWidth: '360',
//         backgroundColor: theme.palette.background.paper,
//     },
//     inline: {
//         display: 'inline',
//     }

// }))
const getRandomAnimal = (str) => {
let accum=0;
for (let i=0;i<str.length;i++){
  accum=accum+str.charCodeAt(i)
  if (i===2){
    accum=accum*2
    }
}
return Animals[accum%Animals.length]
}

const getRandomColor = (str) => {
    let accum=0;
        for (let i=0;i<str.length;i++){
        accum=accum+str.charCodeAt(i)
        
        }
    return Colors[accum%Colors.length]
    }

const Animals =
['huski','bird','chicken','bulldog','horns','leopard','baldeagle','jimmy','meerkat','panda','girraff','dog2',
//'snowleopard',
'cat1','cat2','cat3','cat4','mouse','dog1','owl']
const Colors = ['#a6c7ea','#6899aa','#90d0b6','#b9ddad','#f7f48d','#cdab8f','#fbdddd','#f59597','#fbbe7d','#ceb3d4','#b4b3db','#c0c0c0']

export default function Avatar({commentID,name}) {
    //let randomPic = () => Animals[Math.floor(Math.random() * Animals.length)]
    //let randomColor = Colors[Math.floor(Math.random() * Colors.length)]
    let randomPic = getRandomAnimal(name.toLowerCase())
    let randomColor = getRandomColor(name.toLowerCase())

    return useMemo(() => {
    return (
        <div style={{position:'relative',width:'60px',height:'60px',marginTop:'20px'}}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
            style={{width:'60px',height:'60px'}}>
                <defs>
                    <clipPath id="cut-off-bottom">
                    <rect x="0" y="0" width="60" height="40" />
                    </clipPath>
                    <radialGradient id={randomColor.slice(1)} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor:'rgb(162,162,162)', stopOpacity:1}}/>
                    <stop offset="100%" style={{stopColor:randomColor, stopOpacity:1}} />
                    </radialGradient>
                </defs>
                <circle cx="30" cy="30" r="30" fill={`url(${randomColor})`} clipPath="url(#cut-off-bottom)" />
            </svg>
            <img src={`/avatars/${randomPic}.png`} style={{position:'absolute',bottom:'20px',left:'5px',width:'50px'}} alt="avatar" />
        </div>
    )},[commentID])
}