const CardTitle = (props) => {
	const { children } = props

    return (
		<h3 className="rounded-t-xl bg-secondary text-white h-10 py-2">
			<center>
				{children}
			</center>
		</h3>
	)
}

export default CardTitle
