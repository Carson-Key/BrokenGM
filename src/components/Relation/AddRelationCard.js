// Packages
import { useState, useContext } from 'react'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { addRelation } from '../../helpers/relation'

const RelationCard = (props) => {
    const { id, setRelations, relations, isRelation, playerCharacters } = props
    const [nameToAdd, setNameToAdd] = useState("")
    const setNotification = useContext(NotificationContext)[1]

    return (
        <Card className="h-80">
            <CardTitle>
                Add New Relation
            </CardTitle>
            <div className="text-3xl my-3 mx-4 w-72 overflow-scroll scrollbar-hide h-64 divide-y">
                <div className="flex flex-col items-center justify-center mx-auto w-fit mt-auto h-full ">
                    <input 
                            className="border rounded-lg border-slate-400 text-center h-9 px-2 py-2 w-48"
                            type="text" 
                            name="Add Character"
                            placeholder="John Doe"
                            value={nameToAdd}
                            onChange={(event) => {
                                setNameToAdd(event.target.value)
                            }}
                        />
                        <div className="flex">
                            <button
                                className="my-3 mx-2 text-base rounded-lg border bg-blue-500 text-white px-2 py-1"
                                onClick={
                                    () => {
                                        addRelation(
                                            {name: nameToAdd},
                                            relations, setRelations, 
                                            setNotification, id, isRelation, setNameToAdd
                                        )
                                    }
                                }
                            >
                                Add Blank
                            </button>
                            <button
                                className="my-3 mx-2 text-base rounded-lg border bg-green-500 text-white px-2 py-1"
                                onClick={
                                    () => {
                                        addRelation(
                                            {...playerCharacters, name: nameToAdd},
                                            relations, setRelations, 
                                            setNotification, id, isRelation, setNameToAdd
                                        )
                                    }
                                }
                            >
                                Add w/ Players
                            </button>
                        </div>
                </div>
            </div>
        </Card>
	)
}

export default RelationCard
