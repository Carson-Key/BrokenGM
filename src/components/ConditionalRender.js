const ConditionalRender = (props) => {
    const { condition, children, returnComponent } = props

    if (condition) {
        return children
    } else {
        return ((returnComponent) ? returnComponent : <></>)
    }
}

export default ConditionalRender