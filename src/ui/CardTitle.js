const CardTitle = (props) => {
	const { children, className } = props

    return (
		<h3 className={"text-center rounded-t-xl bg-secondary text-white py-2 break-words px-6 h-fit min-h-10" + (className ? " " + className : "")}>
			{children}
		</h3>
	)
}

export default CardTitle