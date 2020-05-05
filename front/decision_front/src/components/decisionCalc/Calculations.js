export function calculateDecision(){
    return null
}

export function sumArgumentsAndAvg(argumentsArr) {
    let len = argumentsArr.length
    let avg = argumentsArr.reduce((acc,argument) => acc+(argument.confidence+argument.effects+argument.impact),0)
    avg = avg / len || 0
    return avg; // 6.7
    
}

export function calculateAvg(pros, cons) {

    let normProConSum = (sumArgumentsAndAvg(pros)-sumArgumentsAndAvg(cons)) / 3
    //let proLengthMulti = 1 * 
    // Assure you not larger than 5 
    // Use the diff to multiply 
    //return ( ).toFixed(1)

}

export function calculateAvgTexts(avg) {
    
    if (avg === 0) {
        return "It's a tie!"
    }

    if ((avg > -2 && avg < 2) && avg !== 0) {
        return "It's a tough one. We suggest getting some feedback. Or perhaps reconsider your arguments ranking."
    }

    if (avg >= 2 && avg < 4) {
        return "Overall, it Looks like a good idea."    
    }

    if (avg >= 4 && avg <= 5) {
        return "Just do it!"    
    }
    
    if (avg >= -4 && avg < -2) {
        return "Overall, it Looks like a bad idea."    
    }

    if (avg >= -5 && avg < -4) {
        return "Just don't it!" 
    }

}