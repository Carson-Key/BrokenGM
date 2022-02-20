// Packages
import React, { createContext, useReducer } from "react"
// Contexts
import NotificationReducer from './reducers'

const initialState = {
    occures: false,
    type: "",
    message: ""
}

const Store = ({children}) => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState)
  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const NotificationContext = createContext(initialState)
export default Store
