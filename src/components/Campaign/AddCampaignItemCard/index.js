// Packages
import { useState } from 'react'
// UI
import Card from '../../../ui/Card'
import CardTitle from '../../../ui/CardTitle'
// Objects
import { ALLCAMPAIGNITEMS } from '../../../helpers/emptycampaignitems'
import DisplayItemFields from './DisplayItemFields'

const AddCampaignItemCard = (props) => {
    const [selectedItemType, setSelectedItemType] = useState("0")

    return (
        <Card>
            <CardTitle>
                Add New Item
            </CardTitle>
            <div className="h-60 divide-y">
                <div className="flex justify-center my-2">
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
                    itemIndex={selectedItemType}
                />
            </div>
        </Card>
    )
}

export default AddCampaignItemCard
