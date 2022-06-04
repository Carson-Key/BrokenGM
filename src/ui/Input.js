const Input = (props) => {
    const { onChange, labelClass, inputClass, name, labelText, type, checked } = props

	return (
        <label className={labelClass}>
            {labelText}
            <input 
                className={inputClass} 
                type={type} 
                name={name} 
                onChange={onChange} 
                checked={checked}
            />
        </label>
	)
}

export default Input
