// Packages
import { useState, useEffect } from "react"

const IndividualTextVoteDecision = (props) => {
    const { children } = props
    const [className, setClasseName] = useState("")

    useEffect(() => {
        if (children.toLowerCase() === "yes") {
            setClasseName("text-white bg-green-400")
        } else if (children.toLowerCase() === "no") {
            setClasseName("text-white bg-red-400")
        } else if (children.toLowerCase() === "abstain" || children.toLowerCase() === "") {
            setClasseName("text-white bg-gray-400")
        } else {
            setClasseName("text-white bg-sky-400")
        }
    }, [children])

    return (
        <p className={"w-fit mx-auto py-1 px-3 rounded-xl " + className}>{children}</p>
	)
}

export default IndividualTextVoteDecision
