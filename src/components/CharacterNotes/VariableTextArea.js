// Packages
import { useState, useEffect } from 'react'

const VariableTextArea = (props) => {
    const { 
        value, placeholder, index, values, 
        setValue, changeValues, resetInputValues, setResetInputValues
    } = props
    const [inputValue, setInputValue] = useState(value ? value : "")

    useEffect(() => {
        if (resetInputValues < values.length) {
            setInputValue("")
            setResetInputValues(prev => prev + 1)
        }
    }, [resetInputValues, values, setResetInputValues])

    return (
        <textarea
            className="border rounded px-2 py-1 my-2 w-full"
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

export default VariableTextArea
