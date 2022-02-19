// Components
import Container from "../components/Container"
// UI
import ClockCard from "../ui/ClockCard"

const Clocks = () => {
    return (
        <Container className="flex flex-wrap justify-evenly md:justify-start md:px-2 md:py-1">
            <ClockCard title="test" />
        </Container>
	)
}

export default Clocks
