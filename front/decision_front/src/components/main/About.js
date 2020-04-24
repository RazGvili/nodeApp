
import React,{useMemo} from 'react'
import Header from '../header/Header'
import { useTrackedState  } from '../../store'
import {theme} from '../home'
import { ThemeProvider  } from '@material-ui/core/styles';
import { Typography, Avatar, Grid } from '@material-ui/core';

export default function About(props) {
    const {isDark} = useTrackedState()
    return useMemo(() => {
    return (
        <ThemeProvider theme={theme(isDark)}>
        <div style={{background:isDark?'#35314f':'#dce8f3',minHeight:'90vh',color:isDark?'#ffffff':'#000000',textAlign:'center'}}>
            <Header aboutVersion={true} />
            {console.log(isDark)}
            <br /><br />
            <Typography style={{fontSize:'20px',fontWeight:'500'}}>
                Decidy was created because we believe that <span style={{fontFamily:'Permanent Marker',color:isDark?'#DCE8F3':'#35314F'}}>visualizing</span> the decision-making process can improve it.
            <br /><br />
            We ❤️ tech, enjoy code, let us know what you think about Decidy, or just to talk.</Typography>

            <br />

            <Grid container style={{maxWidth:'600px',margin:'auto'}}>
                <Grid item xs={12} sm={6}>
                    <Avatar alt="Amit Turner" style={{width:'70px',height:'70px',margin:'auto'}} src="/images/aboutUs/amit.jpg" />
                    <Typography>
                        Amit Turner
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Avatar alt="Raz Gvili" style={{width:'70px',height:'70px',margin:'auto'}} src="/images/aboutUs/raz.jpg" />
                    <Typography>
                        Raz Gvili
                    </Typography>
                </Grid>
            </Grid>


        </div>
        </ThemeProvider>
    )},[isDark])
}