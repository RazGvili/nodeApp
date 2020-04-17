
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTracked  } from '../../store'
import Paper from '@material-ui/core/Paper'

import { CopyToClipboard } from 'react-copy-to-clipboard'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));


export default function ShowShare(props) {
    const classes = useStyles();

    const [ state, dispatch ] = useTracked()
    const [ copied, setCopied ] = useState(false)

    let id = state.id
    
    return (
        <div>
            <Paper elevation={8} style={{ padding: '10px 0px', backgroundColor: '#dce8f3'}}>

                <h3> Get some feedback! Click to copy link and share with smart people :)</h3>

                <CopyToClipboard text={id}
                    onCopy={() => setCopied(true)}>
                    <button>Copy to clipboard</button>
                </CopyToClipboard>

                {copied && <p>Copied!</p>}

            </Paper>

            <br/>
        </div>
    )
}