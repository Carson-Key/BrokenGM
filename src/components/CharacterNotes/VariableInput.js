// Packages
import { useState, useEffect } from 'react'

const VariableInput = (props) => {
    const { 
        value, placeholder, index, values, 
        setValue, changeValues, resetInputValues, setResetInputValues
    } = props
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        if (resetInputValues < values.length) {
            setInputValue("")
            setResetInputValues(prev => prev + 1)
        }
    }, [resetInputValues, values, setResetInputValues])

    return (
        <input
            className="border rounded px-2 py-1 w-40"
            placeholder={value || value !== "" ? value : placeholder}
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
