// AddCampaignItemCard
import NotesFields from './NotesFields'
import ClockEventsFields from './ClockEventsFields'
// Objects
import { ALLCAMPAIGNITEMS } from '../../../helpers/emptycampaignitems'

const DisplayItemFields = (props) => {
    const { itemIndex, id, clocks } = props
    
    switch (itemIndex) {
        case "0":
            return (<NotesFields id={id} />)
        case "1":
            return (<ClockEventsFields id={id} clocks={clocks} />)
        case "2":
            return (<p>{ALLCAMPAIGNITEMS[itemIndex].name}</p>)
        case "3":
            return (<p>{ALLCAMPAIGNITEMS[itemIndex].name}</p>)
        case "4":
            return (<p>{ALLCAMPAIGNITEMS[itemIndex].name}</p>)
        default:
            return (<p>This campaign item does not exsist</p>)
    }
}

export default DisplayItemFields
