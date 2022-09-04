export const firePopUp = (message, onClick, cancel, setPopUp) => {
    setPopUp({
        type: 'SET_POPUP', 
        payload: { 
            occures: true,
            message,
            onClick,
            cancel
        } 
    })
}