const CampaignLinkCard = (props) => {
    const { items, isAdmin, uid, players } = props

    return (
        items.map((item, i) => {
            return (<p key={i}>This is Item: {item}</p>)
        })
    )
}

export default CampaignLinkCard
