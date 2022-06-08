// Helpers
import { getNumberSuffix, capitalizeFirstLetter } from '../../helpers/misc'

const Timer = (props) => {
    const { timer, clock } = props

    return (
        <section className="h-full">
            <h1 className="text-center md:text-none md:flex text-6xl w-fit mt-auto mx-auto pt-1">
                <p>
                    {
                        capitalizeFirstLetter(
                            clock.daysOfWeek[clock.dayOfWeek]
                        ) + ","
                    }
                </p>
                <p className="lg:mx-2">
                {" The " +
                    clock.dayOfMonth}{getNumberSuffix(clock.dayOfMonth)
                + " of " +
                    capitalizeFirstLetter(
                        clock.monthsOfYear[clock.monthOfYear]
                    )
                + ", "}
                </p>
                <p>
                    {Math.abs(clock.year)} {(clock.year >= 0) ? clock.yearSuffix : clock.preYearSuffix}
                </p>
            </h1>
            <h1 className="text-5xl w-fit mx-auto pt-6">
                {
                    ("0" + Math.floor((timer / 3600000) % 60)).slice(-2) + ":" +
                    ("0" + Math.floor((timer / 60000) % 60)).slice(-2) + ":" +
                    ("0" + Math.floor((timer / 1000) % 60)).slice(-2) + ":" +
                    ("0" + ((timer / 10) % 100)).slice(-2)
                }
            </h1>
        </section>
    )
}

export default Timer
