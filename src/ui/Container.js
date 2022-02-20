// Components
import NotificationHandler from "../components/NotificationHandler"

const Container = (props) => {
	const { children, className } = props

	return (
		<>
			<NotificationHandler />
			<main className={"mb-auto " + className}>
				{children}
			</main>
		</>
	)
}

export default Container
