// AddCampaignItemCard
import NotesFields from './NotesFields'
import ClockEventsFields from './ClockEventsFields'
import ClocksFields from './ClocksFields'
import RelationsFields from './RelationsFields'
import VotingsystemsFields from './VotingsystemsFields'

const DisplayItemFields = (props) => {
    const { itemIndex, id, clocks, events } = props
    
    switch (itemIndex) {
        case "0":
            return (<NotesFields id={id} />)
        case "1":
            return (<ClockEventsFields id={id} clocks={clocks} />)
        case "2":
            return (<ClocksFields id={id} events={events} />)
        case "3":
            return (<RelationsFields id={id} />)
        case "4":
            return (<VotingsystemsFields id={id} />)
        default:
            return (<p>This campaign item does not exsist</p>)
    }
}

export default DisplayItemFields
