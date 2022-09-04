// Packages
import { useState, useContext, useEffect } from "react"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { fireError } from "../../../helpers/notifications"

const DaysInMonthInput = (props) => {
    const { 
        daysInMonths, setDaysInMonths, i, monthsOfYear
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [newAmountOfDays, setNewAmountOfDays] = useState(daysInMonths[i])

    useEffect(() => {
        setNewAmountOfDays(daysInMonths[i])
    }, [monthsOfYear, daysInMonths, i])

    return (  
        <input
            onChange={(event) => {
                if (event.target.value === "") {
                    let tempDaysInMonths = daysInMonths
                    tempDaysInMonths[i] = ""
                    setNewAmountOfDays(tempDaysInMonths[i])
                    setDaysInMonths(tempDaysInMonths)
                } else if (parseInt(event.target.value)) {
                    let tempDaysInMonths = daysInMonths
                    tempDaysInMonths[i] = parseInt(event.target.value)
                    setNewAmountOfDays(tempDaysInMonths[i])
                    setDaysInMonths(tempDaysInMonths)
                } else {
                    fireError(setNotification, 1, "Please only use numbers in Hours in Day")
                }
            }}
            value={newAmountOfDays}
            className="w-40 border rounded px-2 py-1 ml-2 my-2"
            name="hoursInDay"
            type="text"
            placeholder="Days in this month"
        />                      
    )
}

export default DaysInMonthInput
