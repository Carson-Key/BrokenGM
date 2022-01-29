export const addSecond = (timer, ammount = 1) => {
    console.log(timer)
    let returnedTimer = timer
    returnedTimer[0] = timer[0] + ammount
    return returnedTimer
}

