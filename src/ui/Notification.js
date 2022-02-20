const Notification = (props) => {
    const { message, className } = props

    return (
        <div className="absolute top-14 lg:top-24 2xl:top-28 w-screen px-1">
            <div className={"w-fit rounded-lg text-xl px-5 py-2 mt-1 mx-auto " + className}>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Notification
