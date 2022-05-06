// Packages
import { ref, update, onValue, get, off } from "firebase/database"
// Firebase
import { realtimedb } from './firebase'

export const updateRealtimeDB = (data, pathsToUpdate = []) => {
    const updates = {}

    pathsToUpdate.forEach((path, i) => {
        updates[path] = data
    });

    return update(ref(realtimedb), updates)
}

export const getRealtimeDB = (path, onUpdate = () => {}) => {
    const entryRef = ref(realtimedb, path)

    onValue(entryRef, (snapshot) => {
        const data = snapshot.val()
        onUpdate(data)
    })
}

export const getRealtimeDBOnce = (path, onUpdate = () => {}) => {
    const entryRef = ref(realtimedb, path)

    get(entryRef).then((snapshot) => {
        if (snapshot.exists()) {
            onUpdate(snapshot.val())
        } else {
            console.log("No data available")
        }
    }).catch((error) => {
        console.error(error)
    })
}

export const turnListenerOff = (path) => {
    off(ref(realtimedb, path))
}