// Packages
import { GrAddCircle } from 'react-icons/gr'
import { useState } from 'react'
// UI
import Card from './Card'
import CardTitle from './CardTitle'

const RelationCard = (props) => {
    const [nameToAdd, setNameToAdd] = useState("")

    return (
        <Card className="h-80">
            <CardTitle>
                Add New Relation
            </CardTitle>
            <div className="text-3xl my-3 mx-4 w-72 overflow-scroll h-64 divide-y">
                <div className="flex items-center justify-center mx-auto w-fit mt-auto h-full ">
                    <input 
                            className="border rounded-lg border-slate-400 text-center h-9 px-2 py-2 w-48 inline"
                            type="text" 
                            name="Add Character"
                            placeholder="John Doe"
                            onChange={(event) => {
                                setNameToAdd(event.target.value)
                            }}
                        />
                        <button
                            onClick={
                                () => {
                                    console.log(nameToAdd)
                                }
                            }
                        >
                            <GrAddCircle className="inline h-9 mx-1 mb-1" />
                        </button>
                </div>
            </div>
        </Card>
	)
}

export default RelationCard
