import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {green} from '../../helpers/GlobalVars'
import { IconButton, useTheme } from '@material-ui/core'
import Icon from '@mdi/react'
import { ICONS } from '../custom/IconsData'
import Dialog from '@material-ui/core/Dialog';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import {lang as texts} from '../../helpers/texts' 

const useStyles = makeStyles((theme) => ({

    root:{
        color:theme.palette.type==='dark'?'white':'black',
        background:'rgba(0, 0, 0, 0.1)',
        padding:'15px',
        position:'relative', 
        maxWidth: '700px',
        margin:'auto'
        
    },
    copyButton:{
        background:'none',
        textTransform:'none',
        paddingRight:'20px',
        borderRadius: '45px',
        width:'200px',
        border: '1px grey solid',
        '&:hover':{
        background:'rgba(135, 185, 85, 0.5)',
        border: `${green} solid 1px`,
        }
    },
    closeIcon:{
        position:'absolute',
        top:'10px'
    }
}));


export default function ShowHowItWorks({closeAction,lang}) {
    const classes = useStyles()
    //const theme = useTheme()
    
    return (

        <>
            <Dialog open>
            <div className={classes.root} style={{direction:lang==='heb'?'rtl':'ltr'}}>
                    <IconButton onClick={closeAction} className={classes.closeIcon} style={{left:lang==='heb'?'15px':'inherit',right:lang==='heb'?'inherit':'15px'}}>
                        <Icon path={ICONS['Close']} size={1} />
                    </IconButton>

                    <h3 style={{margin: '20px'}}>{texts[lang]['HOW_IT_WORKS']}</h3>

                    <List component="nav">

                        <ListItem >
                            <ListItemIcon>
                                <Icon path={ICONS['QuestionHead']} size={1} />
                            </ListItemIcon>
                            <ListItemText 
                                primary={texts[lang]['HOW_IT_WORKS_ONE_PRIMARY'] }
                                secondary={texts[lang]['HOW_IT_WORKS_ONE_SECONDARY'] }
                            />
                        </ListItem>

                        <ListItem >
                            <ListItemIcon>
                                <Icon path={ICONS['PlusOutline']} size={1} />
                            </ListItemIcon>
                            <ListItemText 
                                primary={texts[lang]['HOW_IT_WORKS_TWO_PRIMARY'] }
                                secondary={texts[lang]['HOW_IT_WORKS_TWO_SECONDARY'] }
                            />
                        </ListItem>
                    
                        <ListItem >
                            <ListItemIcon>
                                <Icon path={ICONS['Save']} size={1} />
                            </ListItemIcon>
                            <ListItemText 
                                primary={texts[lang]['HOW_IT_WORKS_THREE_PRIMARY'] }
                                secondary={texts[lang]['HOW_IT_WORKS_THREE_SECONDARY'] }
                            />
                        </ListItem>
                        
                        <ListItem >
                            <ListItemIcon>
                                <Icon path={ICONS['Share']} size={1} />
                            </ListItemIcon>
                            <ListItemText 
                                primary={texts[lang]['HOW_IT_WORKS_FOUR_PRIMARY'] }
                                secondary={texts[lang]['HOW_IT_WORKS_FOUR_SECONDARY'] }
                            />
                        </ListItem>

                    </List>

            </div>
 
    </Dialog>
        
    </>
    )
}