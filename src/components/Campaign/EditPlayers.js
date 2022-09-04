// Packages
import { Fragment } from 'react'
// Components
import Input from '../../ui/Input'

const EditPlayers = (props) => {
    const { players, toggleAccess, gm, admins } = props
    const playersArray = Object.keys(players)

    return (
        <div className="flex flex-wrap">{
            playersArray.map((playerID, i) => {
                if (playerID !== gm && !admins.includes(playerID)) {
                    return (
                        <Input 
                            key={i}
                            onChange={(event) => {
                                toggleAccess(event, playerID)
                            }}
                            labelClass="px-2 w-1/2"
                            inputClass="mr-1"
                            name={players[playerID].name}
                            labelText={players[playerID].name}
                            checked={players[playerID].access}
                            type="checkbox"
                        />
                    )
                } else {
                    return <Fragment key={i} />
                }
            })
        }</div>
    )
}

export default EditPlayers
