// Packages
import { useState } from 'react'

const VariableTextArea = (props) => {
    const { 
        value, placeholder, index, values, 
        setValue, changeValues
    } = props
    const [inputValue, setInputValue] = useState(value)

    return (
        <textarea
            className="border rounded px-2 py-1 my-2 w-full"
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

export default VariableTextArea
