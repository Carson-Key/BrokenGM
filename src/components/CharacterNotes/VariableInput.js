// Packages
import { useState } from 'react'

const VariableInput = (props) => {
    const { 
        value, placeholder, index, values, 
        setValue, changeValues
    } = props
    const [inputValue, setInputValue] = useState(value)

    return (
        <input
            className="border rounded px-2 py-1 w-40"
            placeholder={placeholder}
            value={inputValue}
            onChange={(event) => {
                let tempValues = [...values]
                changeValues(tempValues, index, event.target.value)
                setValue(tempValues)
                setInputValue(event.target.value)
            }}
        />
	)
}

export default VariableInput
