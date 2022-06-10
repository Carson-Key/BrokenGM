// Packages
import { useState, useContext } from 'react'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Contexts
import { NotificationContext } from '../../contexts/Notification'

const AddEventCard = (props) => {
    const { id, events, setEvents, isClockEvents } = props
    const [nameToAdd, setNameToAdd] = useState("")
    const setNotification = useContext(NotificationContext)[1]

    return (
        <Card className="h-80">
            <CardTitle>
                Add New Relation
            </CardTitle>
            
        </Card>
	)
}

export default AddEventCard
