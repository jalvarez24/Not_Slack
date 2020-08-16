import React, { createContext, useContext, useReducer } from 'react'
import { initialState } from './reducer'

// export type ProviderValue = Object; // since you know this is what the provider will be passing

// export type DefaultValue = undefined;

// export type ContextValue = DefaultValue | ProviderValue;

// export const StateContext = createContext({} as IContextProps)
// export const StateContext = createContext<ContextValue>(undefined)
export const StateContext = createContext<any>(undefined)

export const StateProvider = ({ reducer, initialState, children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state)
    // console.log({dispatch})
    return <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
}

export const useStateValue = () => useContext(StateContext)