const ConfirmationPopUp = (props) => {
    const { onClick, message, cancel } = props

    return (
        <>
            <div className="z-40 absolute inset-0 grid justify-items-center">
                <div className="bg-white w-1/3 h-1/3 mx-auto my-auto rounded-lg">
                    <div className="h-2/3 flex justify-around">
                        <div className="text-2xl my-auto">
                            {message}
                        </div>
                    </div>
                    <div className="flex justify-around h-1/3">
                        <button className="h-8 my-auto text-white bg-red-500" onClick={cancel}>Cancel</button>
                        <button className="h-8 my-auto test-white bg-green-500" onClick={onClick}>Confirm</button>
                    </div>
                </div>
            </div>
            <div className="fixed h-screen w-screen flex bg-black bg-opacity-25 z-0 inset-0"></div>
        </>
    )
}

export default ConfirmationPopUp
