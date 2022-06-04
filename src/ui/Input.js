const Input = (props) => {
    const { onChange, labelClass, inputClass, name, labelText, type, checked } = props

	return (
        <label className={labelClass}>
            <input 
                className={inputClass} 
                type={type} 
                name={name} 
                onChange={onChange} 
                checked={checked}
            />
            {labelText}
        </label>
	)
}

export default Input
