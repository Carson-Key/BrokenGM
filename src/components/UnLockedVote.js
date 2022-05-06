// Packages
import { useState, useEffect } from 'react'
// Components
import VoteResults from './VoteResults'
// UI
import IndividualVote from '../ui/IndividualVote'
// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { getRealtimeDB } from '../helpers/database'
import IsLoading from './IsLoading'

const UnLockedVote = (props) => {
    const { currentVote, id } = props
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
                <h2 className="text-center">{
                    returnChildOfObject(
                        votes, 
                        [currentVote, "description"], 
                        "Loading..."
                    )
                }</h2>
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
