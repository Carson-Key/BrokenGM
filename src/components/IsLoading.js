// Components
import ConditionalRender from "./ConditionalRender"
// UI
import Loading from "../ui/Loading"

const IsLoading = (props) => {
    const { 
        isLoading,
        children
    } = props

    return (
        <ConditionalRender
            condition={isLoading}
            returnComponent={<Loading />}
        >
            {children}
        </ConditionalRender>
    )
}

export default IsLoading
