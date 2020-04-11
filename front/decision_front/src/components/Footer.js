import React from 'react';
import { Container,makeStyles} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  footer: {
    //position: 'absolute',
    //bottom: '0',
    margin:'30px auto 0px',
    width: '100%',
    height: '2.5rem',
  },
  button:{
      textTransform:'none'
  }
  }
));

export default function Footer() {
  const classes = useStyles();

  return (
      <footer className={classes.footer}>
        <Container maxWidth="md" style={{textAlign:'center',padding: '0px'}}>
        <span style={{verticalAlign:'middle',paddingRight:'15px'}}><span style={{fontFamily:'Arial'}}>©</span> decisions 2020</span>
        <Link to="/about">
          About us
        </Link>
        
        </Container>
      </footer>
  );
}

