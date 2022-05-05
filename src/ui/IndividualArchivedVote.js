// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { formatCharacterName } from '../helpers/voting'

const IndividualArchivedVote = (props) => {
    const { votingSystemObject, currentVote, vote } = props

    return (
        <div className="text-center py-2 px-4 mx-2">
            <h2 className="font-bold">
                {formatCharacterName(vote)}
            </h2>
            <p>
                {formatCharacterName(returnChildOfObject(
                    votingSystemObject, 
                    [currentVote, vote], 
                    "Loading..."
                ))}
            </p>
        </div>
	)
}

export default IndividualArchivedVote
