import React from 'react';
import { Container,makeStyles} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useTrackedState } from '../store'

const useStyles = makeStyles(theme => ({
  footer: {
    //position: 'absolute',
    //bottom: '0',
    padding:'20px 0px',
    width: '100%',
    height: '2.5rem',
    color:props=> props.darkMode?'white':'black',
    backgroundColor: props=> props.darkMode?'#35314f':'#dce8f3',
  },
  button:{
      textDecoration:'none',
      color:props=> props.darkMode?'white':'black',
  }
  }));

function Footer() {
  //const context = useContext(store)
  //const { state } = context
  const state = useTrackedState();
  console.log('footer render')
  const classes = useStyles({darkMode:state.isDark})

  return (
      <footer className={classes.footer}>
        <Container maxWidth="md" style={{textAlign:'center',padding: '0px'}}>
        <span style={{verticalAlign:'middle',paddingRight:'15px'}}><span style={{fontFamily:'Arial'}}>©</span> decisions 2020</span>
        <Link to="/about" className={classes.button}>
          About us
        </Link>
        
        </Container>
      </footer>
  );
}

export default React.memo(Footer);
