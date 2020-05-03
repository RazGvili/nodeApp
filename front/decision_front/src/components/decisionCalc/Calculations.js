export function calculateDecision(){
    return null
}

export function sumArgumentsAndAvg(argumentsArr){
    let avg = argumentsArr.reduce((acc,argument) => acc+(argument.confidence+argument.effects+argument.impact),0)
    avg = avg/ argumentsArr.length
    return avg
}

export function calculateAvg(pros,cons){
    return sumArgumentsAndAvg(pros)-sumArgumentsAndAvg(cons)
}