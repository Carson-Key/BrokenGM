// Components
import Container from "../components/Container"

const CenterScreen = (props) => {
    const { children } = props
    return (
        <Container className="mt-auto">
            <section className="h-full">
                {children}
            </section>
        </Container>
    )
}

export default CenterScreen
