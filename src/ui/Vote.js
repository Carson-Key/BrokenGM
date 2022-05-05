// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { formatCharacterName } from '../helpers/voting'

const Vote = (props) => {
    const { votingSystemObject, currentVote } = props
    const votingSystemArray = Object.keys(returnChildOfObject(
        votingSystemObject, 
        [currentVote], 
        {}
    ) ? returnChildOfObject(
        votingSystemObject, 
        [currentVote], 
        {}
    ) : {})

    return (
        <section className="mx-auto">
            <p className="text-center">{
                returnChildOfObject(
                    votingSystemObject, 
                    [currentVote, "description"], 
                    "Loading..."
                )
            }</p>
            <section className="flex flex-col my-4 justify-center divide-y">
                {votingSystemArray.map((vote, i) => {
                    if (vote === "locked" || vote === "description") {
                        return null
                    } else {
                        return (
                            <div key={i} className="text-center py-2 px-4 mx-2">
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
                })}
            </section>
        </section>
	)
}

export default Vote
