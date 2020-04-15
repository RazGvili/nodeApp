// store.js

import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
    loading:true,
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

//const store = createContext(initialState)
//const { Provider } = store

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

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useTracked,
  useUpdate: useDispatch,
} = createContainer(useValue);

// export { store, StateProvider }