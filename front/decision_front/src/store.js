// store.js

import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {

    id: "",
    isReadOnly: false,
    title: "",
    pros: [],
    cons: [],
    comments: [],
    createdAt: "",
    updatedAt: "",

    loading: true,
    error: "",
    isDark: true,
    showSnack: false,
    snackType: "",
    snackText: "",

}


const reducer = (state, action) => {
    console.log('dispatch:'+action.type)
    switch(action.type) {
        
        case "TOGGLE_DARK_MODE":
            return  {
                ...state,
                isDark: !state.isDark
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload.error
            }

        // ------------------------------------------------------------------------------------------------

        // Snacks  ---------------------------------------------------------------------------------------

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
        // ------------------------------------------------------------------------------------------------
            
        // Arguments  ---------------------------------------------------------------------------------------

        case "PRO_CON_ADD":
            
            if (action.payload.arg.type === 'pro') {
                let newArr = [...state.pros, action.payload.arg]
                    
                return {
                    ...state,
                    pros: newArr
                }

            } else {
                let newArr = [...state.cons, action.payload.arg]
                    
                return {
                    ...state,
                    cons: newArr
                }
            }
        
        case "PRO_CON_REMOVE":

            let argToDelete = action.payload.arg
            if (argToDelete.type === 'pro') {
                let newArr = state.pros.filter(argIter => argIter._id !== argToDelete._id)
                
                    
                return {
                    ...state,
                    pros: newArr
                }

            } else {
                let newArr = state.cons.filter(argIter => argIter._id !== argToDelete._id)
                return {
                    ...state,
                    cons: newArr
                }
            }

        case "PRO_CON_EDIT":

            let argToEdit = action.payload.arg
            if (argToEdit.type === 'pro') {
                let newArr = state.pros.map(argIter => argIter._id === argToEdit._id ? argToEdit : argIter)
                
                    
                return {
                    ...state,
                    pros: newArr
                }

            } else {
                let newArr = state.cons.map(argIter => argIter._id === argToEdit._id ? argToEdit : argIter)
                return {
                    ...state,
                    cons: newArr
                }
            }

        // ------------------------------------------------------------------------------------------------

        // Decisions ---------------------------------------------------------------------------------------

        case "TOGGLE_READ_ONLY":
            return  {
                ...state,
                isReadOnly: !state.isReadOnly
            }

        case "TITLE_CHANGE":
            return {
                ...state,
                title: action.payload.text
            }

        case "INIT_DECISION":
            return  {
                ...state,

                id: "",
                isReadOnly: false,
                title: "",
                pros: [],
                cons: [],
                comments: [],
                createdAt: "",
                updatedAt: "",
                loading: false
            }

        case "SAVE_DECISION_NEW":

            console.log(action.payload.decision)

            if (!action.payload.decision) {
                return state
            }

            let decisionFromServer_add = action.payload.decision

            return {
                ...state,
                
                loading: false,
                id: decisionFromServer_add._id,
                createdAt: decisionFromServer_add.createdAt,
                updatedAt: decisionFromServer_add.updatedAt,
            }
        
        case "SET_DECISION":

            //console.log(action.payload.decision)

            if (!action.payload.decision) {
                return state
            }

            let decisionFromServer = action.payload.decision

            return {
                ...state,
                
                loading: false,
                id: decisionFromServer._id,
                isReadOnly: decisionFromServer.isReadOnly,
                title: decisionFromServer.desc,
                pros: [...decisionFromServer.pros],
                cons: [...decisionFromServer.cons],
                comments: [...decisionFromServer.comments],
                createdAt: decisionFromServer.createdAt,
                updatedAt: decisionFromServer.updatedAt,
            }

        // ------------------------------------------------------------------------------------------------
        
        // Comments ---------------------------------------------------------------------------------------
        
        case "REMOVE_COMMENT":

            let commentIDToDelete = action.payload.comment._id
            return {
                ...state,
                comments: state.comments.filter(commentIter => commentIter._id !== commentIDToDelete),
            }
        
        case "ADD_COMMENT":

            //console.log(action.payload.comment)
            let commentToAdd = action.payload.comment

            return {
                ...state,
                comments: [...state.comments, commentToAdd]
            }
        
        // ------------------------------------------------------------------------------------------------

        default:
            console.log('bad dispatch:'+action.type)
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