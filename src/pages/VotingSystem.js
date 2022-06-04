// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
import { ActiveVotes, VoteSystemGrid } from '../components/VotingSystem'
// UI
import Container from '../ui/Container'
import CenterScreen from '../ui/CenterScreen'
// Helpers
import { getRealtimeDBOnce, getRealtimeDB } from '../helpers/database'
import { getCurrentUser } from '../helpers/auth'
import { returnChildOfObject } from '../helpers/misc'
import { updateRealtimeDB } from '../helpers/database'
import { returnArrayOfActiveVotes } from '../helpers/voting'

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
    const [activeVotes, setActiveVotes] = useState([])
    const [amountOfActiveVotes, setAmountOfActiveVotes] = useState(0)
    const [activeVoteIndexes, setActiveVoteIndexes] = useState(0)

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
                    setVotes((data.votes) ? data.votes : {})
                    const votesAsArray = Object.keys((data.votes) ? data.votes : [])
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
            <div className="my-4 divide-x mx-auto">
                <button className="rounded-l-lg bg-gray-100 px-3 py-2" onClick={() => {
                    setVoteDisplayStyle("scrolling")
                }}>
                    <h3>Active Votes</h3>
                </button>
                <button className="rounded-r-lg bg-gray-100 px-3 py-2" onClick={() => {
                    setVoteDisplayStyle("grid")
                }}>
                    <h3>Past Votes</h3>
                </button>
            </div>
            <ConditionalRender condition={isAdmin}>
                <button className="text-center mb-3 w-full" onClick={() => {
                    const newData = {
                        description: "",
                        locked: false,
                        ...returnChildOfObject(
                            votingSystemObject, 
                            ["defaultVoters"], 
                            {}
                        )
                    }
                    const newVotes = {
                        ...votes,
                        [amountOfVotes]: newData
                    }
                    setVotingSystemObject({
                        ...votingSystemObject, 
                        votes: newVotes
                    })
                    setVotes(newVotes)
                    setAmountOfVotes(amountOfVotes + 1)
                    const [tempActiveVotes, tempActiveVoteIndexes] = returnArrayOfActiveVotes(newVotes)
                    setActiveVotes(tempActiveVotes)
                    setAmountOfActiveVotes(tempActiveVotes.length)
                    setActiveVoteIndexes(tempActiveVoteIndexes)
                    updateRealtimeDB(newData, ["votingsystems/" + id + "/votes/" + amountOfVotes + "/"])
                }}><p className="w-fit mx-auto text-white bg-green-500 rounded-md px-2 py-1">
                    Add New Vote
                </p></button>
            </ConditionalRender>
            <ConditionalRender
                condition={amountOfVotes !== 0}
                returnComponent={
                    <CenterScreen>
                        <h1 className="text-4xl w-screen text-center mt-auto mx-auto">
                            There are no votes in this system
                        </h1>
                    </CenterScreen>}
            >
                <Container className="flex flex-col h-full">
                    <ConditionalRender
                        condition={voteDisplayStyle === "scrolling"}
                        returnComponent={<VoteSystemGrid votes={votes} />}
                    >
                        <ActiveVotes
                            id={id}
                            isAdmin={isAdmin}
                            voterKey={voterKey}
                            currentVote={currentVote}
                            setCurrentVote={setCurrentVote}
                            votes={votes}
                            votingSystemObject={votingSystemObject}
                            setVotingSystemObject={setVotingSystemObject}
                            activeVotes={activeVotes}
                            amountOfActiveVotes={amountOfActiveVotes}
                            activeVoteIndexes={activeVoteIndexes}
                            setActiveVotes={setActiveVotes}
                            setAmountOfActiveVotes={setAmountOfActiveVotes}
                            setActiveVoteIndexes={setActiveVoteIndexes}
                        />
                    </ConditionalRender>
                </Container>
            </ConditionalRender>
        </IsLoading>
	)
}

export default VotingSystem
