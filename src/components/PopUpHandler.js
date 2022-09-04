// Packages
import { useContext } from 'react'
// Components
import ConditionalRender from './ConditionalRender'
// UI
import ConfirmationPopUp from '../ui/ConfirmationPopUp'
// Context
import { PopUpContext, initialState } from '../contexts/PopUp'

const PopUpHandler = () => {
    const [popUp, setPopUp] = useContext(PopUpContext)

    return (
        <ConditionalRender condition={popUp.occures}>
            <ConfirmationPopUp 
                message={popUp.message}
                onClick={() => {
                    popUp.onClick()
                    setPopUp({type: "SET_POPUP", payload: initialState})
                }}
                cancel={() => {
                    popUp.cancel()
                    setPopUp({type: "SET_POPUP", payload: initialState})
                }}
            />
        </ConditionalRender>
    )
}

export default PopUpHandler
