import React, { createContext, useReducer, useContext } from 'react';
import * as types from './types';
import reducer from './StoreReducer';
import {getUsers} from './localStorage';

const AppStateContext = createContext();
const AppDispatchContext = createContext();



const StoreProvider = ({ children, store, dispatch }) => {
    const initialStore = {
        users: getUsers() || []
    }
    const [state, stateDispatch] = useReducer(reducer, store || initialStore);
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch || stateDispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
}

const useAppState = () => {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider')
    }
    return context
}

const useAppDispatch = () => {
    const context = useContext(AppDispatchContext)
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider')
    }
    return context
}

const useStore = () => [useAppState(), useAppDispatch()];

export { StoreProvider, useStore, types };

