// Packages
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
// Components
import ConditionalRender from '../components/ConditionalRender';
// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { updateRealtimeDB } from '../helpers/database'

const VotingSystem = (props) => {
    const { 
        id, children, 
        currentVote, setCurrentVote, 
        amountOfVotes, setAmountOfVotes,
        isAdmin, votes, setVotes,
        votingSystemObject, setVotingSystemObject
    } = props

    return (
        <section className="flex">
            <ConditionalRender
                condition={currentVote !== 0}
                returnComponent={
                    <button disabled className="w-8 mr-2"></button>
                }
            >
                <button className="text-center w-8 mr-2" onClick={() => {
                    setCurrentVote(currentVote - 1)
                }}><MdKeyboardArrowLeft /></button>
            </ConditionalRender>
            {children}
            <ConditionalRender
                condition={currentVote !== amountOfVotes - 1}
                returnComponent={
                    <ConditionalRender
                        condition={isAdmin && returnChildOfObject(
                            votes, 
                            [currentVote, "locked"], 
                            {}
                        )}
                        returnComponent={
                            <button disabled className="w-8 mr-2"></button>
                        }
                    >
                        <button className="text-center w-8 ml-2" onClick={() => {
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
                            updateRealtimeDB(newData, ["votingsystems/" + id + "/votes/" + amountOfVotes + "/"])
                        }}><IoAddCircleOutline /></button>
                    </ConditionalRender>
                }
            >
                <button className="text-center w-8 ml-2" onClick={() => {
                    setCurrentVote(currentVote + 1)
                }}><MdKeyboardArrowRight /></button>
            </ConditionalRender>
        </section>
	)
}

export default VotingSystem
