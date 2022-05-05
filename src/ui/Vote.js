// Helpers
import { returnChildOfObject } from '../helpers/misc'

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
            <section>
                {votingSystemArray.map((vote, i) => {
                    if (vote === "locked" || vote === "description") {
                        return <></>
                    } else {
                        return (<p key={i} className="text-center">
                            {vote}: {returnChildOfObject(
                                votingSystemObject, 
                                [currentVote, vote], 
                                "Loading..."
                            )}
                        </p>)
                    }
                })}
            </section>
        </section>
	)
}

export default Vote
