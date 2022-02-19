// UI
import Loading from "../ui/Loading"

const IsLoading = (props) => {
    const { 
        isLoading,
        children
    } = props

    if (isLoading) {
        return (
            <Loading />
        )
    } else {
        return (
            children
        )
    }
}

export default IsLoading
