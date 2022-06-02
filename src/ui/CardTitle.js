import { useState } from "react"

const CardTitle = (props) => {
	const { children, className } = props
	const classNameState = useState(className ? " " + className : "" )[0]

    return (
		<h3 className={"text-center rounded-t-xl bg-secondary text-white py-2 break-words px-6 h-fit min-h-10" + classNameState}>
			{children}
		</h3>
	)
}

export default CardTitle