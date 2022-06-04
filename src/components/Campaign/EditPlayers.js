// Components
import Input from '../../ui/Input'

const EditPlayers = (props) => {
    const { players, toggleAccess } = props
    const playersArray = Object.keys(players)

    return (
        <div className="flex flex-wrap">{
            playersArray.map((playerID, i) => {
                return (
                    <Input 
                        key={i}
                        onChange={(event) => {
                            toggleAccess(event, playerID)
                        }}
                        labelClass="px-4 w-1/2"
                        name={players[playerID].name}
                        labelText={players[playerID].name}
                        checked={players[playerID].access}
                        type="checkbox"
                    />
                )
            })
        }</div>
    )
}

export default EditPlayers
