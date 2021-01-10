const sqlite3 = require('sqlite3').verbose();

//connect to database
let db = new sqlite3.Database('./us-census.db', sqlite3.OPEN_READONLY, (err) => {
    if(err){
      return console.log(err);
    }
    console.log('Connected to database.');
});


//get columns names
exports.columnList = (req, res) => {
    const sql = 'PRAGMA table_info(census_learn_sql)';
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        
        res.status(200).send({rows});
    });
};

//get data about a column 
exports.columnData = (req, res) => {
    const str = req.params.name.replace(/-/g, ' ');
    const sql = "SELECT `" + str + "` as 'column', COUNT (*) as 'count', AVG (age) as 'avg'  FROM census_learn_sql GROUP BY `" + str + "` ORDER BY `" + str + "` DESC LIMIT 100 ";

    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        
        res.status(200).send({rows});
    });
}


//count rows
exports.columnTotalRow = (req, res) => {
    const str = req.params.name.replace(/-/g, ' ');
    const sql = "SELECT COUNT(DISTINCT `" + str + "`) as total FROM census_learn_sql";

    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        res.status(200).send({rows});
    });
}