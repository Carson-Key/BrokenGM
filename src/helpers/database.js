// Packages
import { ref, update, onValue } from "firebase/database"
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
    });
}