// Packages
import React, { createContext, useReducer } from "react"
// Contexts
import PopUpReducer from './reducers'

export const initialState = {
    occures: false,
    message: "",
    onClick: () => {},
    cancel: () => {}
}

const Store = ({children}) => {
  const [state, dispatch] = useReducer(PopUpReducer, initialState)
  return (
    <PopUpContext.Provider value={[state, dispatch]}>
      {children}
    </PopUpContext.Provider>
  )
}

export const PopUpContext = createContext(initialState)
export default Store
