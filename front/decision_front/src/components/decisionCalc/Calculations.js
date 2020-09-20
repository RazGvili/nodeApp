export function calculateDecision(){
    return null
}

export function sumArgumentsAndAvg(argumentsArr) {
    let len = argumentsArr.length
    let sum = argumentsArr.reduce((acc,argument) => acc+(argument.confidence+argument.effects+argument.impact),0)
    let avg = sum / len || 0
    return avg; // 6.7
}

export function calculateAvg(pros, cons) {

    let lenDiffSign = pros.length - cons.length > 0 ? 1 : -1
    let lenDiff = Math.abs(pros.length - cons.length)
    let normToThree_sumOfAvg = (sumArgumentsAndAvg(pros)-sumArgumentsAndAvg(cons)) / 2
    let addition = 0

    if (lenDiff >= 1) {        

        let maxGrowth = (3 - Math.abs(normToThree_sumOfAvg))

        for (let step = 0; step < lenDiff; step++) {
            
            let additionStep = maxGrowth / (maxGrowth + lenDiff)

            if (additionStep + addition < maxGrowth) { 
                addition += additionStep
            } 
        }
    }

    normToThree_sumOfAvg = normToThree_sumOfAvg + addition*lenDiffSign 
    return normToThree_sumOfAvg.toFixed(2)


}

export function calculateAvgTexts(avg) {
    
    if (avg === 0) {
        return "It's a tie!"
    }

    if ((avg > -1 && avg < 1) && avg !== 0) {
        return "It's a tough one. We suggest getting some feedback. Or perhaps reconsider your arguments ranking."
    }

    if (avg >= 1 && avg < 2) {
        return "Overall, it Looks like a good idea."    
    }

    if (avg >= 2 && avg <= 3) {
        return "Just do it!"    
    }
    
    if (avg >= -2 && avg < -1) {
        return "Overall, it Looks like a bad idea."    
    }

    if (avg >= -3 && avg < -2) {
        return "Just don't it!" 
    }

}