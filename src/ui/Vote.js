// Helpers
import { returnChildOfObject } from '../helpers/misc'

const Vote = (props) => {
    const { votingSystemObject } = props

    return (
        <p className="mx-auto">{returnChildOfObject(votingSystemObject, [0, "description"], "Loading...")}</p>
	)
}

export default Vote
