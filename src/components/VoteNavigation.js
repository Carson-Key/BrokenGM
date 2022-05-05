// Packages
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// Components
import ConditionalRender from '../components/ConditionalRender';

const VotingSystem = (props) => {
    const { children, currentVote, setCurrentVote, amountOfVotes } = props

    return (
        <>
            <ConditionalRender
                condition={currentVote !== 0}
                returnComponent={
                    <button className="w-8 mr-2"></button>
                }
            >
                <button className="w-8 mr-2" onClick={() => {
                    setCurrentVote(currentVote - 1)
                }}><MdKeyboardArrowLeft /></button>
            </ConditionalRender>
            {children}
            <ConditionalRender
                condition={currentVote !== amountOfVotes - 1}
                returnComponent={
                    <button className="w-8 ml-2"></button>
                }
            >
                <button className="w-8 ml-2" onClick={() => {
                    setCurrentVote(currentVote + 1)
                }}><MdKeyboardArrowRight /></button>
            </ConditionalRender>
        </>
	)
}

export default VotingSystem