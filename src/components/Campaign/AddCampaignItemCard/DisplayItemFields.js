// Objects
import { ALLCAMPAIGNITEMS } from '../../../helpers/emptycampaignitems'

const DisplayItemFields = (props) => {
    const { itemIndex } = props

    console.log(itemIndex)
    
    switch (itemIndex) {
        case "0":
            return (<p>{ALLCAMPAIGNITEMS[itemIndex].name}</p>)
        case "1":
            return (<p>{ALLCAMPAIGNITEMS[itemIndex].name}</p>)
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
