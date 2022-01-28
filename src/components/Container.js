const Container = (props) => {
	const { children, className } = props

	return (
		<main className={"mb-auto " + className}>
			{children}
		</main>
	)
}

export default Container
