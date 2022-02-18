const TimerController = (props) => {
    const { isLoading, setIsActive, isActive } = props

    return (
        <>
            <button disabled={isLoading} onClick={() => {setIsActive(!isActive)}}>start/stop</button>
        </>
	)
}

export default TimerController
