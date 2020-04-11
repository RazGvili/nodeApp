// store.js

import React, {createContext, useReducer} from 'react'

const initialState = {
    error: "",
    isDark: false
}

const store = createContext(initialState)
const { Provider } = store

const reducer = (state, action) => {

    switch(action.type) {

        case "TOGGLE_DARK_MODE":
            const newState = {
                ...state,
                isDark: !state.isDark
            }

        return newState

        default:
            return state
    }
}

const StateProvider = ( { children } ) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }