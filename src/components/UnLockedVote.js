// Packages
import { useState, useEffect } from 'react'
// Components
import VoteResults from './VoteResults'
import ConditionalRender from './ConditionalRender'
import IsLoading from './IsLoading'
// UI
import IndividualVote from '../ui/IndividualVote'
// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { getRealtimeDB, updateRealtimeDB } from '../helpers/database'

const UnLockedVote = (props) => {
    const { currentVote, id, isAdmin } = props
    const [votes, setVotes] = useState({})
    const [votesArray, setVotesArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getRealtimeDB(
            "votingsystems/" + id + "/votes/" + currentVote, 
            (data) => {
                if (data) {
                    setIsLoading(false)
                    setVotes(data)
                    setVotesArray(Object.keys(data))
                }
            }
        )
    }, [currentVote, id])

    return (
        <IsLoading IsLoading={isLoading}>
            <section className="mx-auto">
                <ConditionalRender
                    condition={isAdmin}
                    returnComponent={
                        <h2 className="text-center">{
                            returnChildOfObject(
                                votes, 
                                ["description"], 
                                "Loading..."
                            )
                        }</h2>
                    }
                >
                    <input 
                        className="border broder-gray-300 rounded-md px-2 py-1"
                        type="text"
                        name="description" 
                        placeholder="description"
                        value={returnChildOfObject(
                            votes, 
                            ["description"], 
                            "Loading..."
                        )}
                        onChange={(event) => {
                            updateRealtimeDB(event.target.value, ["votingsystems/" + id + "/votes/" + currentVote + "/description/"])
                        }}
                    />
                </ConditionalRender>
                <VoteResults 
                    votes={votes}
                    currentVote={currentVote}
                />
                <section className="flex flex-col my-4 justify-center divide-y overflow-scroll">
                    {votesArray.map((vote, i) => {
                        if (vote === "locked" || vote === "description") {
                            return null
                        } else {
                            return (
                                <IndividualVote 
                                    key={i}
                                    votes={votes}
                                    currentVote={currentVote}
                                    vote={vote}
                                />
                            )
                        }
                    })}
                </section>
            </section>
        </IsLoading>
	)
}

export default UnLockedVote
