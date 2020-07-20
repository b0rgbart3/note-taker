// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var Note = require("./note");
var Journal = require("./journal"); 
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var dataPath = "db/db.json";

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let journal;
//var journal = new Journal();

var notesRaw = fs.readFileSync(path.resolve("db", "db.json"), "utf8");
if (notesRaw) {
  var notesData = JSON.parse(notesRaw);
  var notesCount = notesData.length;
  journal = new Journal(notesData);
 
  // for (var i =0; i < notesCount; i++) {
  //   // create a new Note Object
  //   var thisNote = new Note(notesData[i].title, notesData[i].text, notesData[i].id);
  //   notes.push(thisNote);
  // }
} else {
  journal = new Journal();
}


// Routes
// =============================================================


  app.delete("/api/notes/:id", function(req,res){
    var id = req.params.id;

  //  console.log("About to delete:" + id);

    //notes.splice(id, 1);
    // Find the object who's ID matches
    // var noteToDelete = notes.filter(obj => {
    //   return obj.id === id
    // });
  //  console.log(notes);
    // console.log("Note to delete: " + noteToDelete);

    // // Find the index of the found object in the array
    // var index = notes.findIndex(noteToDelete);

    // // remove the object from the array
    // notes.splice(index,1);
    res.end();

  });
  app.get("/api/notes", function(req, res) {
    // var dbFile = fs.readFileSync(path.resolve("db", "db.json"), "utf8");
    // if (dbFile) {
    //   notes = JSON.parse(dbFile);
    // } else {
    //   notes = [];
    // }
    //console.log(journal);
    //console.log( journal.getNotes() );

    return res.json(journal.getNotes());
    // console.log("API - notes: " + JSON.stringify(notes));

    // fs.readFile(dataPath, "utf8", (err, data) => {
    //   if (err) {
    //     throw err;
    //   }
    //   notes = data;
    //   // res.send(JSON.parse(data));
    //   res.send(notes);
    // });


  });

  app.post("/api/notes", function(req, res) {
    // need to read in the json file, then append the req.body to it.
 
   
    // var newNote = {
    //   id: idCounter,
    //   title: req.body.title,
    //   text: req.body.text,
    // };
    //var newNote = new Note(req.body.title, req.body.text );
    // console.log("before posting: " + req.body.title);

    var newNote = journal.newNote( req.body);

    //notes.push(newNote);
    // console.log(notes);
    // fs.writeFile("db/db.json",JSON.stringify(notes), function() { 
    //   res.json(newNote);
    // });

    res.json(newNote);
  
  });

  app.get("/notes", function(req, res) {
   // console.log("hello");
     res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("*", function(req, res) {
   // res.sendFile(path.join(__dirname, "public/index.html"));
    express.static("public/index.html");  //, [options]
  });
    
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


