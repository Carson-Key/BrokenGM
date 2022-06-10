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
            <div className="text-center my-2 mx-4 w-72 scrollbar-hide overflow-scroll">
                <p>{description}</p>
            </div>
        </Card>
	)
}

export default EventCard
