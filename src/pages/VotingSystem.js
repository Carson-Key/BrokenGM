// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsFillGrid3X3GapFill } from "react-icons/bs"
import { CgScrollH } from "react-icons/cg";
// Components
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
// UI
import Container from '../ui/Container'
import VoteSystemScroling from '../ui/VoteSystemScroling'
import VoteSystemGrid from '../ui/VoteSystemGrid'
// Helpers
import { getRealtimeDBOnce, getRealtimeDB } from '../helpers/database'
import { getCurrentUser } from '../helpers/auth'
import { returnChildOfObject } from '../helpers/misc'

const VotingSystem = () => {
    const { id } = useParams()
    const [votingSystemObject, setVotingSystemObject] = useState({})
    const [votes, setVotes] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [currentVote, setCurrentVote] = useState(0)
    const [amountOfVotes, setAmountOfVotes] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [voterKey, setVoterKey] = useState(null)
    const setUID = useState("")[1]
    const [voteDisplayStyle, setVoteDisplayStyle] = useState("scrolling")

    useEffect(() => {
        setVotingSystemObject(getRealtimeDBOnce(
            "votingsystems/" + id, 
            (data) => {
                if (data) {
                    getCurrentUser(setUID, (uid) => {
                        if (Object.keys(returnChildOfObject(data, ["admins"], {})).includes(uid)) {
                            setIsAdmin(true)
                        } else if (Object.keys(returnChildOfObject(data, ["voters"], {})).includes(uid)) {
                            setVoterKey(returnChildOfObject(data, ["voters", uid], {}))
                        }
                    })
                    setVotingSystemObject(data)
                    setVotes(data.votes)
                    const votesAsArray = Object.keys(data.votes)
                    if (votesAsArray.length > 0) {
                        setCurrentVote(votesAsArray.length - 1)
                        setAmountOfVotes(votesAsArray.length)
                    } else {
                        setAmountOfVotes(0)
                    }
                    getRealtimeDB(
                        "votingsystems/" + id + "/votes/" + votesAsArray.length, 
                        (data) => {
                            if (data) {
                                window.location.reload(false);
                            }
                        }
                    )
                    setIsLoading(false) 
                }
            }
        ))
    }, [id, amountOfVotes, setUID])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto flex flex-col">
                <ConditionalRender
                    condition={amountOfVotes !== 0}
                    returnComponent={<p>There are no votes in this system</p>}
                >
                    <div className="my-4 ml-5 divide-x">
                        <button className="rounded-l-lg bg-gray-100 px-3 py-2" onClick={() => {
                            setVoteDisplayStyle("scrolling")
                        }}>
                            <CgScrollH className="text-xl" />
                        </button>
                        <button className="rounded-r-lg bg-gray-100 px-3 py-2" onClick={() => {
                            setVoteDisplayStyle("grid")
                        }}>
                            <BsFillGrid3X3GapFill className="text-xl" />
                        </button>
                    </div>
                    <ConditionalRender
                        condition={voteDisplayStyle === "scrolling"}
                        returnComponent={<VoteSystemGrid votes={votes} />}
                    >
                        <VoteSystemScroling
                            id={id}
                            isAdmin={isAdmin}
                            voterKey={voterKey}
                            currentVote={currentVote}
                            setCurrentVote={setCurrentVote}
                            amountOfVotes={amountOfVotes}
                            setAmountOfVotes={setAmountOfVotes}
                            votes={votes}
                            setVotes={setVotes}
                            votingSystemObject={votingSystemObject}
                            setVotingSystemObject={setVotingSystemObject}
                        />
                    </ConditionalRender>
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default VotingSystem
