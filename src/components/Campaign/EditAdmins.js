// Packages
import { Fragment } from 'react'
// Components
import Input from '../../ui/Input'

const EditAdmins = (props) => {
    const { admins, players, toggleAccess, gm } = props
    const playersArray = Object.keys(players)

    return (
        <div className="flex flex-wrap">{
            playersArray.map((playerID, i) => {
                if (playerID !== gm) {
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
                            checked={admins.includes(playerID)}
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

export default EditAdmins
