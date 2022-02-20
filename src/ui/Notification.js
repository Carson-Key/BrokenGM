const Notification = (props) => {
    const { message, className } = props

    return (
        <div className={"w-fit py-2 px-1 " + className}>
            <p>{message}</p>
        </div>
    )
}

export default Notification
