const Notification = (props) => {
    const { message, className } = props

    return (
        <p className={"absolute z-40 top-1 left-1/2 transform -translate-x-1/2 w-fit rounded-lg text-xl lg:text-3xl px-5 py-2 " + className}>{message}</p>
    )
}

export default Notification
