// Components
import Input from '../../ui/Input'

const EditPlayers = (props) => {
    const { players, toggleAccess } = props
    const playersArray = Object.keys(players)

    return playersArray.map((playerID, i) => {
        return (
            <Input 
                key={i}
                onChange={(event) => {
                    toggleAccess(event, playerID)
                }}
                labelClass="mx-4"
                name={players[playerID].name}
                labelText={players[playerID].name}
                checked={players[playerID].access}
                type="checkbox"
            />
        )
    })
}

export default EditPlayers
