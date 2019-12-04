const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const { averageDurationObj, operationMax, operationMin } = require('./solution');
 
db.serialize(function() {
  db.run("CREATE TABLE GraphqlDurations (operation varchar(255) not null, operationType TEXT not null, duration DECIMAL not null, method enum not null)")

    const stmt = db.prepare("INSERT INTO GraphqlDurations (operation, operationType, duration, method) values (?, ?, ?, ?)")

    // Average
        for (let ave in averageDurationObj){
            try {
                stmt.run(ave, averageDurationObj[ave]["type"], averageDurationObj[ave]["operation"], "AVG")
                console.log('insert successful')
            }   catch (err){
                console.log('error inserting data', err)
            }
        }

    // Maximum
    for (let max in operationMax){
        try {
            stmt.run(max, operationMax[max]["type"], operationMax[max]["operation"], "MAX")
            console.log('insert successful')
        }   catch (err){
            console.log('error inserting data', err)
        }
    }

    // Minimum
    for (let min in operationMin){
        try {
            stmt.run(min, operationMin[min]["type"], operationMin[min]["operation"], "MIN")
            console.log('insert successful')
        }   catch (err){
            console.log('error inserting data', err)
        }
    }

    stmt.finalize();

    db.each("SELECT * from GraphqlDurations", function(err, row) {
        if(err !== null){
            return;
        }
        console.log('the data', row);
    });

});
 
db.close();