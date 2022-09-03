// Packages
import { useState, useContext } from "react"
import { GrAddCircle } from 'react-icons/gr'
import { FaTrash } from "react-icons/fa"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { fireError } from "../../../helpers/notifications"
import { removeElementFromArray } from "../../../helpers/misc"

const DaysInWeek = (props) => {
    const { 
        daysInWeek, setDaysInWeek, afterAddFunc, afterRemoveFunc
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [newDayOfWeek, setNewDayOfWeek] = useState("")

    return (
        <div className="ml-2">
            <div className="flex flex-wrap">
                {
                    daysInWeek.map((day, i) => {
                        return (
                            <div key={i} className={
                                    "w-1/2 py-2 px-2 flex justify-between" +
                                    ((i < daysInWeek.length - ((daysInWeek.length % 2 !== 0) ? 1 : 2)) ? " border-b" : "") +
                                    (((i % 2 === 0) && (daysInWeek.length > 1)) ? " border-r" : "")
                                }
                            >
                                {day}
                                <button className="text-red-500"
                                    onClick={() => {
                                        let tempDaysInWeek = removeElementFromArray(daysInWeek, day)
                                        setDaysInWeek(tempDaysInWeek)
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
                    name="Add Day of Week"
                    placeholder="Name of day"
                    value={newDayOfWeek}
                    onChange={(event) => {
                        setNewDayOfWeek(event.target.value)
                    }}
                />
                <button
                    onClick={
                        () => {
                            if (newDayOfWeek !== "") {
                                setNewDayOfWeek("")
                                setDaysInWeek([...daysInWeek, newDayOfWeek])
                                afterAddFunc()
                            } else {
                                fireError(setNotification, 1, "Please fill day of week field before adding a new entry")
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

export default DaysInWeek
