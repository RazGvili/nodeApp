
import React,{useMemo} from 'react'
import Header from '../header/Header'
import { useTrackedState  } from '../../store'
import {theme} from '../home'
import { ThemeProvider  } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export default function About(props) {
    const {isDark} = useTrackedState()
    return useMemo(() => {
    return (
        <ThemeProvider theme={theme(isDark)}>
        <div style={{background:isDark?'#35314f':'#dce8f3',minHeight:'90vh',color:isDark?'#ffffff':'#000000'}}>
            <Header aboutVersion={true} />
            {console.log(isDark)}
            <Typography>Hello this is about</Typography>
        </div>
        </ThemeProvider>
    )},[isDark])
}