// Packages
import { useState, useContext } from 'react'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Helpers
import { saveEvent, checkInput, translateTimeStampToMili } from '../../helpers/clockevents'
// Contexts
import { NotificationContext } from '../../contexts/Notification'

const AddEventCard = (props) => {
    const { id, events, setEvents, isClockEvents, clockData } = props
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
                    <p>HH:HH(24 hour)/DD/MM/YYYY</p>
                    <input 
                        className="border rounded-lg border-slate-400 h-9 px-2 py-2 w-full"
                        type="text" 
                        name="Add Time Stamp"
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
                        className="border rounded-lg text-left border-slate-400 break-words px-2 py-2 w-full h-24"
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
                            const splitTime = timeToAdd.split("/")
                            const splitHoursMinis = splitTime[0].split(":")
                            let time = {
                                minsNumber: parseInt(splitHoursMinis[1]),
                                hoursNumber: parseInt(splitHoursMinis[0]),
                                daysNumber: parseInt(splitTime[1]),
                                monthsNumber: parseInt(splitTime[2]),
                                yearsNumber: parseInt(splitTime[3]),
                                minsString: splitHoursMinis[1],
                                hoursString: splitHoursMinis[0],
                                daysString: splitTime[1],
                                monthsString: splitTime[2],
                                yearsString: splitTime[3]
                            }
                            time.timer = translateTimeStampToMili(time.hoursNumber, time.minsNumber)
                            const hoursInDay = clockData ? clockData.hoursInDay : null
                            const daysInMonth = clockData ? (clockData.daysInMonths[time.monthsNumber - 1] ? clockData.daysInMonths[time.monthsNumber - 1] : -1 ) : null
                            const monthsInYear = clockData ? clockData.daysInMonths.length : null
                            const daysInYear = clockData ? clockData.daysInMonths.reduce((partialSum, a) => partialSum + a, 0) : null
                            const daysInMonths = clockData ? clockData.daysInMonths : null
                            if (checkInput(
                                [time.minsNumber, time.hoursNumber, time.daysNumber, time.monthsNumber, time.yearsNumber],
                                [time.minsString, time.hoursString, time.daysString, time.monthsString, time.yearsString],
                                time.timer, hoursInDay, daysInMonth, monthsInYear, setNotification
                            )) {
                                saveEvent(
                                    time.timer, time.daysNumber, time.monthsNumber, time.yearsNumber,
                                    descriptionToAdd, setNotification,
                                    id, events, setEvents, isClockEvents, hoursInDay, daysInYear, daysInMonths
                                )
                            }
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
