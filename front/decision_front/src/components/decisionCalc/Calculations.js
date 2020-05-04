export function calculateDecision(){
    return null
}

export function sumArgumentsAndAvg(argumentsArr){
    let avg = argumentsArr.reduce((acc,argument) => acc+(argument.confidence+argument.effects+argument.impact),0)
    avg = avg/ argumentsArr.length || 0
    return avg; // 6.7
    
}

export function calculateAvg(pros,cons){
    return (sumArgumentsAndAvg(pros)-sumArgumentsAndAvg(cons)).toFixed(1)
}