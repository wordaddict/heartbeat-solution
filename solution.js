const fs = require('fs');

// Reading the files from the logs
let file = fs.readFileSync('./logs.log', "utf8");
file = file.toString();
file = file.split('\n');

let subscriptionsArray = [];
let queryArray = [];
let mutationArray = [];
let operations = [];

// sorting by operations
for(let data of file){
    if(data.includes("subscription") && !data.includes("opId")){
        subscriptionsArray.push(data)
    } else if(data.includes("query") && !data.includes("opId")){
        queryArray.push(data)
    } else if(data.includes("update") && !data.includes("opId")){
        mutationArray.push(data)
    }

    if(data.includes("opId")){
        operations.push(data);
    }
};
let operationsObject = {};
// Get counts for different operations
for(let operation of operations){
        let res = operation.split('|')[1];
        res = res.split('operation:')[1].trim();
        if(operationsObject[res] === undefined){
            operationsObject[res] = 1;
        } else {
            const value = operationsObject[res];
            operationsObject[res] = value + 1;
        };
};
    
console.log('------------------------');
console.log('Question 1.');
console.log('Number of subscription performed: ', subscriptionsArray.length);
console.log('Number of query performed: ', queryArray.length);
console.log('Number of mutations performed: ', mutationArray.length);
console.log('------------------------');

console.log('Question 2.');
console.log('count for different operations: ', operationsObject)
console.log('------------------------');


// Get average, maximum and minimum duration time for query
let queryDurationCount = 0;
let firstQueryDuration = mutationArray[0].split('|')[2].split('duration:')[1].trim();
let minQuery = firstQueryDuration;
let maxQuery = firstQueryDuration;
for(let query of queryArray){
    let res = query.split('|')[2];
    res = res.split('duration:')[1].trim();
    queryDurationCount = queryDurationCount + Number(res);

    // check for min query
    if(res < minQuery){
        minQuery = res;
    }

    // check for max query
    if(res > maxQuery){
        maxQuery = res;
    }
};


const totalLengthOfAllQueryOperationType = queryArray.length;
const ans = queryDurationCount / totalLengthOfAllQueryOperationType;
console.log('Question 3.');
console.log('Average query duration times: ', ans);

// Get average, maximum and minimum duration time for subscription

let subscriptionDurationCount = 0;
let firstSubDuration = subscriptionsArray[0].split('|')[2].split('duration:')[1].trim();
let minSubscription = firstSubDuration;
let maxSubscription = firstSubDuration;
for(let subscription of subscriptionsArray){
    let res = subscription.split('|')[2];
    res = res.split('duration:')[1].trim();
    res = Number(res)
    subscriptionDurationCount = subscriptionDurationCount + res;

        // check for min subscription
        if(res < minSubscription){
            minSubscription = res;
        }
    
        // check for max subscription
        if(res > maxSubscription){
            maxSubscription = res;
        }
};

const totalLengthOfAllSubscriptionOperationType = subscriptionsArray.length;
const subAns = subscriptionDurationCount / totalLengthOfAllSubscriptionOperationType
console.log('Average subscription duration times: ', subAns);

// Get average , maximum and minimum duration time for mutations

let mutationDurationCount = 0;
let firstMutationDuration = mutationArray[0].split('|')[2].split('duration:')[1].trim();
let minMutation = firstMutationDuration;
let maxMutation = firstMutationDuration;
for(let mutation of mutationArray){
    let res = mutation.split('|')[2];
    if(res.split('duration:')[1] !== undefined){
        res = res.split('duration:')[1].trim();
        mutationDurationCount = mutationDurationCount + Number(res);
    }

    // check for min Mutation
    if(res < minMutation){
        minMutation = res;
    }

    // check for max mutation
    if(res > maxMutation){
        maxMutation = res;
    }
};
const totalLengthOfAllMutationOperationType = mutationArray.length;
const mutationAns = mutationDurationCount / totalLengthOfAllMutationOperationType
console.log('Average mutation duration times: ', mutationAns);

// Duration by operation


let operationCount = {};
let averageDurationObj = {}
let operationMax = {};
let operationMin = {};
let index = 0;
for (let operation in operationsObject){
    operationMax[operation] = {"operation": 0}
    index++;
    for(let data of file){
        if(data.includes(operation)){
            let res = data.split('|')[2];
            if(res.split('duration:')[1] !== undefined){
                res = res.split('duration:')[1].trim();
                res = Number(res);
                let operationType = "";
                // check for operation type
                if(data.includes("subscription")){
                    operationType = "subscription"
                } else if(data.includes("query")){
                    operationType = "query"
                } else if(data.includes("update")){
                    operationType = "mutation"
                } else {
                    operationType = "mutation"
                }
                
                // set total count for average operation
                if(operationCount[operation] === undefined|| operationCount[operation]["operation"] === undefined){
                    operationCount[operation] = {"operation": res, "type": operationType};
                    operationCount[operation]["type"] = operationType;
                } else {
                    const value = operationCount[operation]["operation"]
                    operationCount[operation]["operation"] = res + value;
                    operationCount[operation]["type"] = operationType;
                }

                // check for max number
              
                if(res > operationMax[operation]["operation"]){
                    operationMax[operation]= {"operation": res, "type": operationType};
                };

                // check for min number
                if(index = 1){
                    operationMin[operation] = {"operation": res, "type": operationType};
                } else if(res < operationMin[operation]["operation"]){
                    operationMin[operation]["operation"] = res;
                }
            }
        }

        
    };

    // total count of all duration by operation
    const total = operationCount[operation]["operation"];
    const type = operationCount[operation]["type"];

    // total number of all operations
    const countNumber = operationsObject[operation];

     // average number of all duration per operations
    const averageDuration = total / countNumber;
    averageDurationObj[operation] = {"operation": averageDuration, "type": type}
    
}

console.log('Average duration times grouped by operation: ', averageDurationObj);
console.log('------------------------');
console.log('Question 4.');
console.log('Maximum query duration times: ', maxQuery);
console.log('Maximum subscription duration times: ', maxSubscription);
console.log('Maximum mutation duration times: ', maxMutation);
console.log('Maximum duration times grouped by operation: ', operationMax);
console.log('------------------------');
console.log('Question 5.');
console.log('Minimum query duration times: ', minQuery);
console.log('Minimum subscription duration times: ', minSubscription);
console.log('Minimum mutation duration times: ', minMutation);
console.log('Minimum duration times grouped by operation: ', operationMin);
console.log('------------------------');

module.exports = {
    averageDurationObj,
    operationMax,
    operationMin
};
