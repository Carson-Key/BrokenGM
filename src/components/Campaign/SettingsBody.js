const SettingsBody = (props) => {
    const { children } = props

    return (
        <div className="px-2 divide-y h-60 overflow-auto scrollbar-hide text-lg">
            {children}
        </div>
    )
}

export default SettingsBody
