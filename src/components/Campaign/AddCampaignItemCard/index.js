// Packages
import { useState } from 'react'
// AddCampaignItemCard
import DisplayItemFields from './DisplayItemFields'
// UI
import Card from '../../../ui/Card'
import CardTitle from '../../../ui/CardTitle'
// Objects
import { ALLCAMPAIGNITEMS } from '../../../helpers/emptycampaignitems'

const AddCampaignItemCard = (props) => {
    const { id, clocks } = props
    const [selectedItemType, setSelectedItemType] = useState("0")

    return (
        <Card>
            <CardTitle>
                Add New Item
            </CardTitle>
            <div className="h-60 px-2 divide-y overflow-scroll scrollbar-hide">
                <div className="flex justify-center py-2">
                    <h3 className="text-lg font-medium">Item to Add:</h3>
                    <select className="border rounded ml-2" value={selectedItemType} onChange={(event) => {
                        setSelectedItemType(event.target.value)
                    }}>
                        {
                            ALLCAMPAIGNITEMS.map((item, i) => {
                                return (<option key={i} value={i}>{item.name}</option>)
                            })
                        }
                    </select>
                </div>
                <DisplayItemFields
                    id={id}
                    itemIndex={selectedItemType}
                    clocks={clocks}
                />
            </div>
        </Card>
    )
}

export default AddCampaignItemCard
