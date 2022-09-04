// Packages
import { useState, useContext } from "react"
import { GrAddCircle } from 'react-icons/gr'
import { FaTrash } from "react-icons/fa"
// ClockSettings
import DaysInMonthInput from "./DaysInMonthInput"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { fireError } from "../../../helpers/notifications"
import { removeElementFromArray } from "../../../helpers/misc"

const Months = (props) => {
    const { 
        monthsOfYear, setMonthsOfYear, daysInMonths, setDaysInMonths, afterAddFunc, afterRemoveFunc
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [newMonth, setNewMonth] = useState("")

    return (
        <div className="ml-2">
            <div className="flex flex-wrap flex-col">
                {
                    monthsOfYear.map((month, i) => {
                        return (
                            <div key={i} className="px-2 flex">
                                <h5 className="my-auto">{month}: </h5>        
                                <DaysInMonthInput
                                    daysInMonths={daysInMonths} amountofDays={daysInMonths[i]}
                                    setDaysInMonths={setDaysInMonths} i={i} monthsOfYear={monthsOfYear}
                                />
                                <button className="text-red-500 mx-2"
                                    onClick={() => {
                                        let tempMonthsOfYear = removeElementFromArray([...monthsOfYear], month)
                                        let tempDaysInMonths = [...daysInMonths]
                                        tempDaysInMonths.splice(i, 1)
                                        setMonthsOfYear(tempMonthsOfYear)
                                        setDaysInMonths(tempDaysInMonths)
                                        afterRemoveFunc()
                                    }}
                                >
                                    <FaTrash/>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-2 mx-auto w-fit h-fit">
                <input 
                    className="border rounded-lg border-slate-400 text-center h-9 px-1 py-1 w-32 inline"
                    type="text"
                    name="Add Month"
                    placeholder="Name of Month"
                    value={newMonth}
                    onChange={(event) => {
                        setNewMonth(event.target.value)
                    }}
                />
                <button
                    onClick={
                        () => {
                            if (newMonth !== "") {
                                setNewMonth("")
                                setMonthsOfYear([...monthsOfYear, newMonth])
                                setDaysInMonths([...daysInMonths, ""])
                                afterAddFunc()
                            } else {
                                fireError(setNotification, 1, "Please fill month name field before adding a new entry")
                            }
                        }
                    }
                >
                    <GrAddCircle className="inline h-9 mx-1 mb-1" />
                </button>
            </div>
        </div>
    )
}

export default Months
