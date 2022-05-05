// Helpers
import { returnChildOfObject } from '../helpers/misc'

const Vote = (props) => {
    const { votingSystemObject, currentVote } = props

    return (
        <section className="mx-auto">
            <p className="text-center">{
                returnChildOfObject(
                    votingSystemObject, 
                    [currentVote, "description"], 
                    "Loading..."
                )
            }</p>
        </section>
	)
}

export default Vote
