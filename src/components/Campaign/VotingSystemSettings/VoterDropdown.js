// Packages
import { useState } from "react"
// Helpers
import { formatCharacterName } from "../../../helpers/voting"

const VoterDropdown = (props) => {
    const { 
        defaultVoters, value, onChange
    } = props
    const [valueState, setValueState] = useState(value)

    return (
        <select 
            className="border rounded bg-gray-100 ml-2"
            value={valueState} onChange={(event) => {
            setValueState(event.target.value)
            onChange(event.target.value)
        }}>
            <option value={""}>none</option>
            {
                defaultVoters.map((voter, i) => {
                    return (<option key={i} value={voter}>{formatCharacterName(voter)}</option>)
                })
            }
        </select>
    )
}

export default VoterDropdown
