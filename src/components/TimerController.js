const TimerController = (props) => {
    const { isLoading, setIsActive, isActive } = props

    return (
        <>
            <button disabled={isLoading} onClick={() => {setIsActive(!isActive)}}>start/stop</button>
            <div>
                <input type="text" name="Change Clock" placeholder="+/- Time"/>
                <button disabled={isLoading}>Minutes</button>
                <button disabled={isLoading}>Hours</button>
                <button disabled={isLoading}>Days</button>
                <button disabled={isLoading}>Week</button>
                <button disabled={isLoading}>Months</button>
                <button disabled={isLoading}>Years</button>
            </div>
        </>
	)
}

export default TimerController
