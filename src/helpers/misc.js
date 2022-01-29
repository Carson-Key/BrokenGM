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
    if (number === 1) {
        return "st"
    } else if (number === 2) {
        return "nd"
    } else if (number === 3) {
        return "rd"
    } else {
        return "th"
    }
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}