const Card = (props) => {
    const { children, className, id } = props

    return (
        <section id={id} className={"m-2 w-80 rounded-2xl border-2 border-secondary flex flex-col " + className}>
            {children}
        </section>
	)
}

export default Card
