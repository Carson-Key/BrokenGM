// UI
import Card from '../ui/Card'
import CardTitle from '../ui/CardTitle'

const CampaignLinkCard = (props) => {
    const { items, isAdmin, uid, players } = props

    return (
        items.map((item, i) => {
            return (
                <Card key={i}>
                    <CardTitle>Test</CardTitle>
                    <p>This is Item: {item}</p>
                </Card>
            )
        })
    )
}

export default CampaignLinkCard
