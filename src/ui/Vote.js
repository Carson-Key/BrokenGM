// Helpers
import { returnChildOfObject } from '../helpers/misc'

const Vote = (props) => {
    const { votingSystemObject, currentVote } = props

    return (
        <p className="mx-auto">{
            returnChildOfObject(
                votingSystemObject, 
                [currentVote, "description"], 
                "Loading..."
            )
        }</p>
	)
}

export default Vote
