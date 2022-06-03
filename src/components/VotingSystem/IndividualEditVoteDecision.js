// Packages
import { useState, useEffect } from "react"
// Helpers
import { returnChildOfObject } from '../../helpers/misc'
import { formatCharacterName, reverseFormatCharacterName } from '../../helpers/voting'
import { updateRealtimeDB } from '../../helpers/database'

const IndividualEditVoteDecision = (props) => {
    const { vote, colors, votes, id, currentVote } = props
    const [className, setClasseName] = useState("")
    const [voteForColor, setVoteForColor] = useState(returnChildOfObject(
        votes, 
        [vote], 
        "Loading..."
    ))
    const colorObject = useState(colors ? colors : {
        yes: "text-white bg-green-400 placeholder:text-white",
        no: "text-white bg-red-400 placeholder:text-white",
        none: "text-white bg-gray-400 placeholder:text-white",
        default: "text-white bg-sky-400 placeholder:text-white"
    })[0]

    useEffect(() => {
        if (voteForColor.toLowerCase() === "yes") {
            setClasseName(colorObject.yes)
        } else if (voteForColor.toLowerCase() === "no") {
            setClasseName(colorObject.no)
        } else if (voteForColor.toLowerCase() === "abstain" || voteForColor.toLowerCase() === "" || voteForColor.toLowerCase() === '') {
            setClasseName(colorObject.none)
        } else {
            setClasseName(colorObject.default)
        }
    }, [voteForColor, colorObject])

    return (
        <input 
            className={"border broder-gray-300 rounded-md w-fit text-center placeholder:text-center " + className}
            type="text"
            name={formatCharacterName(vote) + "'s vote"}
            placeholder="Type Your Vote Here"
            value={formatCharacterName(votes[vote])}
            onChange={(event) => {
                const newData = reverseFormatCharacterName(event.target.value)
                setVoteForColor(newData)
                updateRealtimeDB(newData, ["votingsystems/" + id + "/votes/" + currentVote + "/" + vote + "/"])
            }}
        />
	)
}

export default IndividualEditVoteDecision
