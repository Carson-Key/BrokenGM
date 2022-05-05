// Components
import PageOfLinkCards from '../components/PageOfLinkCards'

const VotingSystems = () => {
    return (
        <PageOfLinkCards 
            noCardText="You Don't Have Any Voting Systems"
            cardInnerText="To Voting System page"
            docID="votingsystems"
            toPath="votingsystem"
        />
    )
}

export default VotingSystems
