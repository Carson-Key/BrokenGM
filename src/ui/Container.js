// Components
import NotificationHandler from "../components/NotificationHandler"

const Container = (props) => {
	const { children, className } = props

	return (
		<main className={"mb-auto " + className}>
			<NotificationHandler />
			{children}
		</main>
	)
}

export default Container
