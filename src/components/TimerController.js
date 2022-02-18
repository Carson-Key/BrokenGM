const TimerController = (props) => {
    const { isLoading, setIsActive, isActive } = props

    return (
        <>
            <button disabled={isLoading} onClick={() => {setIsActive(!isActive)}}>start/stop</button>
            <div>
                <input type="text" name="Change Clock" placeholder="+/- Time"/>
                <button>Minutes</button>
                <button>Hours</button>
                <button>Days</button>
                <button>Week</button>
                <button>Months</button>
                <button>Years</button>
            </div>
        </>
	)
}

export default TimerController
