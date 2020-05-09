
import React,{useMemo} from 'react'
import Header from '../header/Header'
import { useTrackedState  } from '../../store'
import {theme} from '../home'
import { ThemeProvider  } from '@material-ui/core/styles';
import { Typography, Avatar, Grid, Button, IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Icon from '@mdi/react';
import { ICONS } from '../custom/IconsData';

export default function About(props) {
    const {isDark} = useTrackedState()
    const history = useHistory();

    return useMemo(() => {
    return (
        <ThemeProvider theme={theme(isDark)}>
        <div style={{background:isDark?'#35314f':'#dce8f3',minHeight:'90vh',color:isDark?'#ffffff':'#000000',textAlign:'center'}}>
            <Header aboutVersion={true} />
            {console.log(isDark)}
            <br /><br />

            <Button style={{position:'absolute',top:'80px',left:'15px',textTransform:'none'}} onClick={() => history.goBack()}><Icon path={ICONS['ArrowLeft']} size={1} /> Back</Button>

            <Typography style={{fontSize:'20px',fontWeight:'500'}}>
                Decidy was created because we believe that <span style={{fontFamily:'Permanent Marker,Varela Round',color:isDark?'#DCE8F3':'#35314F'}}>visualizing</span> the decision-making process can improve it.
            <br /><br />
            We ❤️ tech, code & great  products.
            <br /> <br />
            Let us know what you think about Decidy</Typography>

            <br /><br />

            <Grid container style={{maxWidth:'600px',margin:'auto'}}>
                <Grid item xs={12} sm={6}>
                    <Avatar alt="Amit Turner" style={{width:'70px',height:'70px',margin:'auto'}} src="/images/aboutUs/amit.jpg" />
                    <Typography style={{marginTop:'10PX',fontWeight:'600'}}>
                        Amit Turner
                    </Typography>
                    <div>
                        <IconButton href="https://amitturner.github.io/portfolio/" target="_blank"><Icon path={ICONS['Web']} size={1} /></IconButton>
                        <IconButton href="https://www.linkedin.com/in/amit-turner/" target="_blank"><Icon path={ICONS['LinkedIn']} size={1} /></IconButton>
                        <IconButton href="https://github.com/AmitTurner" target="_blank"><Icon path={ICONS['GitHub']} size={1} /></IconButton>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Avatar alt="Raz Gvili" style={{width:'70px',height:'70px',margin:'auto'}} src="/images/aboutUs/raz.jpg" />
                    <Typography style={{marginTop:'10PX',fontWeight:'600'}}>
                        Raz Gvili
                    </Typography>
                    <div>
                        <IconButton href="https://aboutraz.web.app/" target="_blank"><Icon path={ICONS['Web']} size={1} /></IconButton>
                        <IconButton href="https://www.linkedin.com/in/raz-gvili/" target="_blank"><Icon path={ICONS['LinkedIn']} size={1} /></IconButton>
                        <IconButton href="https://github.com/RazGvili" target="_blank"><Icon path={ICONS['GitHub']} size={1} /></IconButton>
                    </div>
                </Grid>
            </Grid>


        </div>
        </ThemeProvider>
    )},[isDark])
}