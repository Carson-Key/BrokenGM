export const splitNumberToReverseArray = (number) => {
    return (number + '').split('').reverse()
}

export const defaultAccessArray = (array, index, defaultValue = null) => {
    if (array[index]) {
        return array[index]
    } else {
        return defaultValue
    }
}

export const getNumberSuffix = (number) => {
    const lastDidgetOfNumber = number % 10

    if (number === 11 || number === 12 || number === 13) {
        return "th"
    } else if (lastDidgetOfNumber === 1) {
        return "st"
    } else if (lastDidgetOfNumber === 2) {
        return "nd"
    } else if (lastDidgetOfNumber === 3) {
        return "rd"
    } else {
        return "th"
    }
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const returnChildOfObject = (
    object = {}, 
    keys = [], 
    returnIfNull = null
) => {
    if (keys.length === 1) {
        return object[keys[0]]
    } else {
        return object ? 
            returnChildOfObject(
                object[keys[0]], 
                keys.slice(1), 
                returnIfNull
            ) : returnIfNull
    }
}

export const getHighestValueKey = (object) => {
    return Object.keys(object).reduce(
        (key1, key2) => {
            return object[key1] > object[key2] ? key1 : key2
        });
  }