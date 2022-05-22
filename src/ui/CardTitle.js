const CardTitle = (props) => {
	const { children } = props

    return (
		<h3 className="text-center rounded-t-xl bg-secondary text-white py-2 break-all px-6 h-fit min-h-10">
			{children}
		</h3>
	)
}

export default CardTitle