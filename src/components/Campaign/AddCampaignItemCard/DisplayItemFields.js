// AddCampaignItemCard
import NotesFields from './NotesFields'
import ClockEventsFields from './ClockEventsFields'
import ClocksFields from './ClocksFields'
// Objects
import { ALLCAMPAIGNITEMS } from '../../../helpers/emptycampaignitems'

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
            return (<p>{ALLCAMPAIGNITEMS[itemIndex].name}</p>)
        case "4":
            return (<p>{ALLCAMPAIGNITEMS[itemIndex].name}</p>)
        default:
            return (<p>This campaign item does not exsist</p>)
    }
}

export default DisplayItemFields
