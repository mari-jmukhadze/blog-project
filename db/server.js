const express = require("express");
const app = express();
const mysql = require('mysql');
const { CHAR_NO_BREAK_SPACE } = require("picomatch/lib/constants");
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Lobjanasimpo777",
        database: "blog"
      });

con.connect()
app.get('/api/users', function(req, res) {
    const user_id = req.query.id;
    let data = null;
    
    let query;
    if (user_id){
        query = `SELECT * FROM Users WHERE Id = ${user_id}`;
    }
     else {
        query = "SELECT * FROM Users";
    }

    con.query(query, function (err, result, fields) {
        if (err) throw err;
        data = result
        console.log(data);

        res.send({
              "data": data
        });
      });
});

app.get("/api/blogs", function(req, res){
    const user_id = req.query.userId;
    const blog_id = req.query.id;
    const page = req.query.page;
    let data = null;


})

app.listen(3000, () => {
 console.log("Server running on port 3000");
 
});

