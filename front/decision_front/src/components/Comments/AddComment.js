import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/core/Button'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
    },
  },
}));



export default function FormPropsTextFields() {
    const classes = useStyles();

    // ========================================

    const [title, setTitle] = useState("")

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    // ========================================

    const [name, setName] = useState("")

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    // ========================================

    const [text, setText] = useState("")

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    // ========================================

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let newComment = {
            title,
            name,
            text
        }

        console.log(newComment)
    }

    return (

        <div>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}> 

                
                <TextField
                    required
                    id="outlined-required"
                    label="Clearly define your decision"
                    placeholder="Should i quit my job?"
                    variant="outlined"
                    fullWidth
                    helperText="Defining and scoping is helpful"
                    value={title}
                    onChange={handleTitleChange}
                />
                
                <TextField
                    required
                    label="Name"
                    placeholder="John"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Clearly define your decision"
                    placeholder="Should i quit my job?"
                    variant="outlined"
                    fullWidth
                    helperText="Defining and scoping is helpful"
                    value={text}
                    onChange={handleTextChange}
                />

                <Button type="submit"> Add comment </Button>

            </form>
        </div>        
    )
}