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