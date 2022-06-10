// Packages
import { useState, useContext } from 'react'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Contexts
import { NotificationContext } from '../../contexts/Notification'

const AddEventCard = (props) => {
    const { id, events, setEvents, isClockEvents } = props
    const [timeToAdd, setTimeToAdd] = useState("")
    const [descriptionToAdd, setDescriptionToAdd] = useState("")
    const setNotification = useContext(NotificationContext)[1]

    return (
        <Card className="h-80">
            <CardTitle>
                Add New Event
            </CardTitle>
            <div className="flex flex-col my-2 mx-4 w-72 scrollbar-hide overflow-scroll">
                <div>
                    <p>Time Stamp</p>
                    <input 
                        className="border rounded-lg border-slate-400 h-9 px-2 py-2 w-full"
                        type="text" 
                        name="Add Character"
                        placeholder="HH:HH(24 hour)/DD/MM/YYYY"
                        value={timeToAdd}
                        onChange={(event) => {
                            setTimeToAdd(event.target.value)
                        }}
                    />
                </div>
                <div>
                    <p>Description</p>
                    <textarea 
                        className="border rounded-lg text-left border-slate-400 break-words px-2 py-2 w-full h-28"
                        type="text-area" 
                        name="Add Description"
                        placeholder="Event description..."
                        value={descriptionToAdd}
                        onChange={(event) => {
                            setDescriptionToAdd(event.target.value)
                        }}
                    />
                </div>
                <button
                    className="my-3 mx-2 text-base rounded-lg border bg-green-500 text-white px-2 py-1"
                    onClick={
                        () => {
                            
                        }
                    }
                >
                    Add Event
                </button>
            </div>
        </Card>
	)
}

export default AddEventCard
