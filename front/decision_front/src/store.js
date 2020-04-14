// store.js

import React, {createContext, useReducer} from 'react'

const initialState = {
    
    id: "",
    isReadOnly: false,
    title: "",
    pros: [],
    cons: [],
    comments: [],
    createdAt: "",
    updatedAt: "",

    error: "",
    isDark: false,
    showSnack: false,
    snackType: "",
    snackText: "",

}

const store = createContext(initialState)
const { Provider } = store

const reducer = (state, action) => {

    switch(action.type) {

        case "TOGGLE_DARK_MODE":
            return  {
                ...state,
                isDark: !state.isDark
            }


        case "OPEN_SNACK":

            return {
                ...state,
                showSnack: !state.showSnack,
                snackType: action.payload.type,
                snackText: action.payload.text
            }


        case "CLOSE_SNACK":
            return {
                ...state,
                showSnack: !state.showSnack
            }
        
        case "TITLE_CHANGE":
            return {
                ...state,
                title: action.payload.text
            }
        
        default:
            return state
    }
}

const StateProvider = ( { children } ) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }