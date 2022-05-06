// Packages
import { useState, useEffect } from 'react'
// Components
import VoteResultsUnlocked from './VoteResultsUnlocked'
import ConditionalRender from './ConditionalRender'
import IsLoading from './IsLoading'
// UI
import IndividualVote from '../ui/IndividualVote'
// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { getRealtimeDB, updateRealtimeDB, turnListenerOff } from '../helpers/database'

const UnLockedVote = (props) => {
    const { currentVote, id, isAdmin, voterKey } = props
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
                    <center>
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
                                turnListenerOff("votingsystems/" + id + "/votes/" + currentVote + "/description/")
                                updateRealtimeDB(event.target.value, ["votingsystems/" + id + "/votes/" + currentVote + "/description/"])
                            }}
                        />
                    </center>
                </ConditionalRender>
                <VoteResultsUnlocked 
                    votes={votes}
                    currentVote={currentVote}
                />
                <ConditionalRender
                    condition={isAdmin}
                >
                    <center>
                        <button 
                            className="border broder-gray-300 rounded-md mt-2 px-2 py-1 text-white bg-sky-400"
                            onClick={() => {
                                updateRealtimeDB(true, ["votingsystems/" + id + "/votes/" + currentVote + "/locked/"])
                            }}
                        >
                            Finalize
                        </button>
                    </center>
                </ConditionalRender>
                <section className="flex flex-col my-4 justify-center divide-y overflow-scroll">
                    {votesArray.map((vote, i) => {
                        if (vote === "locked" || vote === "description") {
                            return null
                        } else {
                            return (
                                <IndividualVote 
                                    key={i}
                                    isAdmin={isAdmin}
                                    voterKey={voterKey}
                                    votes={votes}
                                    currentVote={currentVote}
                                    vote={vote}
                                    id={id}
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
