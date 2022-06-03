// Components
import PageOfLinkCards from '../components/PageOfLinkCards'

const Campaigns = () => {
    return (
        <PageOfLinkCards 
            noCardText="You Don't Have Any Campaigns"
            cardInnerText="To Campaign page"
            docID="campaigns"
            toPath="campaigns"
        />
    )
}

export default Campaigns
