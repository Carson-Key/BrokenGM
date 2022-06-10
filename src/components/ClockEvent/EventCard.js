// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Helpers
import { generateClockTimeStamp, generateClockTimeStampWithoutClock } from '../../helpers/clockevents'

const EventCard = (props) => {
    const { time, description, clockData } = props

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
                >
                    Delete
                </button>
            </div>
        </Card>
	)
}

export default EventCard
