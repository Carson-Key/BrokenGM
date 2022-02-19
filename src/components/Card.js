const Card = (props) => {
    const { children, className, id } = props

    return (
        <section id={id} className={"m-2 w-80 h-96 rounded-2xl border-2 border-secondary " + className}>
            {children}
        </section>
	)
}

export default Card
