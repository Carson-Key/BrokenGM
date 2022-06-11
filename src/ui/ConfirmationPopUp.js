const ConfirmationPopUp = (props) => {
    const { onClick, message, cancel } = props

    return (
        <>
            <div className="
                z-50 absolute top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2 
                w-72 bg-white h-fit py-4 px-2 rounded-lg
            ">
                <p className="text-center mb-4">
                    {message}
                </p>
                <div className="flex justify-around h-1/3">
                    <button 
                        className="h-8 my-auto text-white bg-red-500 py-1 px-3 w-fit rounded" 
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                    <button 
                        className="h-8 my-auto test-white text-white bg-green-500 py-1 px-3 w-fit rounded"
                        onClick={onClick}
                    >
                        Confirm
                    </button>
                </div>
            </div>
            <div 
                className="fixed h-screen w-screen flex bg-black bg-opacity-50 z-40 inset-0"
            ></div>
        </>
    )
}

export default ConfirmationPopUp
