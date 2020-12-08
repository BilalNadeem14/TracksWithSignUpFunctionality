import React, { useReducer } from 'react';

export default (reducer, actions, defaultStateValue) => {
    const Context = React.createContext()
    console.log('createDataContext')
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultStateValue)

        const boundActions = {};

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
         }

         return (
             <Context.Provider value={{state, ...boundActions }}>
                 {children}
             </Context.Provider>
         )
    }

    return { Context, Provider} //same as => Context: Context, Provider: Provider
}