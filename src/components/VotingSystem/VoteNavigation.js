// Packages
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react"
// Components
import ConditionalRender from '../ConditionalRender';
// Helpers

const VotingSystem = (props) => {
    const { 
        id, children, 
        currentVote, setCurrentVote, 
        amountOfVotes, setAmountOfVotes,
        isAdmin, votes, setVotes,
        votingSystemObject, setVotingSystemObject, 
        activeVoteIndexes
    } = props
    const [activeVoteIndex, setActiveVoteIndex] = useState(0)

    return (
        <section className="flex justify-center">
            <ConditionalRender
                condition={activeVoteIndex !== activeVoteIndexes.length - 1}
                returnComponent={
                    <button disabled className="w-8 mr-2"></button>
                }
            >
                <button className="text-center w-8 mr-2" onClick={() => {
                    setActiveVoteIndex(activeVoteIndex + 1)
                    setCurrentVote(activeVoteIndexes[activeVoteIndex + 1])
                }}><MdKeyboardArrowLeft /></button>
            </ConditionalRender>
                <div className="flex-col justify-center">
                    {children}
                </div>
            <ConditionalRender
                condition={activeVoteIndex !== 0}
                returnComponent={
                    <button disabled className="w-8 mr-2"></button>
                }
            >
                <button className="text-center w-8 ml-2" onClick={() => {
                    setActiveVoteIndex(activeVoteIndex - 1)
                    setCurrentVote(activeVoteIndexes[activeVoteIndex - 1])
                }}><MdKeyboardArrowRight /></button>
            </ConditionalRender>
        </section>
	)
}

export default VotingSystem