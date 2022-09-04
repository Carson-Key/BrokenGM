// Components
import NotificationHandler from "../components/NotificationHandler"
import PopUpHandler from "../components/PopUpHandler"

const Container = (props) => {
	const { children, className } = props

	return (
		<>
			<NotificationHandler />
			<PopUpHandler />
			<main className={"mb-auto " + className}>
				{children}
			</main>
		</>
	)
}

export default Container
