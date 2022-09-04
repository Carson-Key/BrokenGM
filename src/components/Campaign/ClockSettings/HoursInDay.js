// Packages
import { useContext } from 'react'
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { fireError } from "../../../helpers/notifications"

const HoursInDay = (props) => {
    const { hoursInDay, setHoursInDay } = props
    const setNotification = useContext(NotificationContext)[1]

    return (
        <input
            onChange={(event) => {
                if (event.target.value === "") {
                    setHoursInDay(event.target.value)
                } else if (parseInt(event.target.value)) {
                    setHoursInDay(parseInt(event.target.value))
                } else {
                    fireError(setNotification, 1, "Please only use numbers in Hours in Day")
                }
            }}
            value={hoursInDay}
            className="w-40 border rounded px-2 py-1 ml-2 my-2"
            name="hoursInDay"
            type="text"
            placeholder="Hours in a Day"
        />
    )
}

export default HoursInDay
