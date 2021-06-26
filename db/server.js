const { query } = require("express");
const express = require("express");
const app = express();
const mysql = require('mysql');
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Ac!12bDDt4",
        database: "blog"
      });
      var bodyParser = require('body-parser') 

      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(bodyParser.json());
      var jsonParser = bodyParser.json();

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
    const resultsperpage = 5
    let query = null;
    let data = null;

    if (user_id){
        query = `SELECT * FROM Blogs b INNER JOIN Users u ON u.Id = b.user WHERE b.user = ${user_id}`;
    }
     else {
        query = "SELECT * FROM Blogs b INNER JOIN Users u ON u.Id = b.user";
    }

    con.query(query, function (err, result, fields) {
        if (err) throw err;
        data = result
        console.log(data.length);
        let num_pages = Math.ceil(data.length/resultsperpage);

        let pg;
        if (!page){
            pg = 1;
        }
        else {
            pg = page;
        }

        let final_res = (pg -1) * resultsperpage;
        query = query +  ` LIMIT ${final_res}, ${resultsperpage}`;

        con.query(query, function (err, resultBlog, fields){
            resultBlog.forEach(blog => {
                query = `SELECT * FROM comment_connect WHERE blog_id = ${blog.idBlogs}`
                // result[blog.idBlogs] = []
                
                //ver xedavs response cvlilebas da solution??
                // con.query(query, function (err, resultConnection, fields){
                //     resultConnection.forEach(connection => {
                //         query = `SELECT * FROM Comments WHERE comment_id = ${connection.comment_id}`
                        

                //         con.query(query, function (err, resultComment, fields){
                //             result[blog.idBlogs].push(resultComment)
                //             console.log(result)

                //         })
                //     })

                })
            })

            res.send({
                "data": result,
                "numberOfPages": num_pages
          });
        });

      });


//requests ver ighebs why?? undefined
app.post('/api/users', jsonParser, function(req, res){
    console.log(req)
    res.setHeader('Content-Type', 'application/json')

    res.send(JSON.stringify({key:"value"}));
})


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
 
});

