// Packages
import { useState, useEffect } from "react"

const IndividualTextVoteDecision = (props) => {
    const { children, colors } = props
    const [className, setClasseName] = useState("")
    const colorObject = useState(colors ? colors : {
        yes: "text-white bg-green-400",
        no: "text-white bg-red-400",
        none: "text-white bg-gray-400",
        default: "text-white bg-sky-400"
    })[0]

    useEffect(() => {
        if (children.toLowerCase() === "yes") {
            setClasseName(colorObject.yes)
        } else if (children.toLowerCase() === "no") {
            setClasseName(colorObject.no)
        } else if (children.toLowerCase() === "abstain" || children.toLowerCase() === "" || children.toLowerCase() === '') {
            setClasseName(colorObject.none)
        } else {
            setClasseName(colorObject.default)
        }
    }, [children, colorObject])

    return (
        <p className={"w-fit mx-auto py-1 px-3 rounded-xl " + className}>{children}</p>
	)
}

export default IndividualTextVoteDecision
