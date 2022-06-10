// Packages
import { useState } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
import ConfirmationPopUp from '../../ui/ConfirmationPopUp'
// Helpers
import { generateClockTimeStamp, generateClockTimeStampWithoutClock } from '../../helpers/clockevents'

const EventCard = (props) => {
    const { time, description, clockData } = props
    const [popUp, setPopUp] = useState(false)

    return (
        <Card className="h-80">
            <CardTitle>
                {
                    (clockData) ? 
                        generateClockTimeStamp(
                            time.year, 
                            (time.year >= 0) ? 
                                clockData.yearSuffix : clockData.preYearSuffix, 
                            clockData.monthsOfYear[time.month], 
                            time.day, 
                            time.timer  
                        ) : generateClockTimeStampWithoutClock(
                            time.year, time.month, time.day, time.timer
                        )

                }
            </CardTitle>
            <div className="flex flex-col justify-between h-full">
                <div className="text-center my-2 mx-4 w-72 scrollbar-hide overflow-scroll h-52 break-words">
                    <p>{description}</p>
                </div>
                <button 
                    className="bg-red-500 text-white py-1 px-3 w-fit mx-auto my-2 rounded"
                    onClick={() => {setPopUp(true)}}
                >
                    Delete
                </button>
            </div>
            <ConditionalRender condition={popUp}>
                <ConfirmationPopUp
                    message="Are you sure you want to delete this event"
                    onClick={() => {
                        console.log("yes")
                        setPopUp(false)
                    }}
                    cancel={() => {
                        console.log("no")
                        setPopUp(false)
                    }}
                />
            </ConditionalRender>
        </Card>
	)
}

export default EventCard
