const sqlite3 = require('sqlite3').verbose();




//get columns names
exports.columnList = (req, res) => {

    //connect to database
    let db = new sqlite3.Database('./us-census.db', sqlite3.OPEN_READONLY, (err) => {
        if(err){
        return console.log(err);
        }
        console.log('Connected to database.');
    });

    const sql = 'PRAGMA table_info(census_learn_sql)';
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        
        res.status(200).send({rows});
    });


    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
};

//get data about a column 
exports.columnData = (req, res) => {

    //connect to database
    let db = new sqlite3.Database('./us-census.db', sqlite3.OPEN_READONLY, (err) => {
        if(err){
        return console.log(err);
        }
        console.log('Connected to database.');
    });

    const str = req.params.name.replace(/-/g, ' ');
    const sql = "SELECT `" + str + "` as 'column', COUNT (*) as 'count', AVG (age) as 'avg'  FROM census_learn_sql WHERE `" + str + "` IS NOT NULL GROUP BY `" + str + "` ORDER BY `" + str + "` DESC LIMIT 100 ";

    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        
        res.status(200).send({rows});
    });

    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
}


//count rows
exports.columnTotalRow = (req, res) => {

    //connect to database
    let db = new sqlite3.Database('./us-census.db', sqlite3.OPEN_READONLY, (err) => {
        if(err){
        return console.log(err);
        }
        console.log('Connected to database.');
    });

    const str = req.params.name.replace(/-/g, ' ');
    const sql = "SELECT COUNT(DISTINCT `" + str + "`) as total FROM census_learn_sql";

    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        res.status(200).send({rows});
    });

    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
}

