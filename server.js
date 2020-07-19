// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


var notes = [];
// Routes
// =============================================================


// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

  app.delete("/api/notes/:id", function(req,res){
    var id = req.params.id -1;

    console.log("About to delete:" + id);

    notes.splice(id, 1);
    // Find the object who's ID matches
    // var noteToDelete = notes.filter(obj => {
    //   return obj.id === id
    // });
    console.log(notes);
    // console.log("Note to delete: " + noteToDelete);

    // // Find the index of the found object in the array
    // var index = notes.findIndex(noteToDelete);

    // // remove the object from the array
    // notes.splice(index,1);
    res.end();

  });
  app.get("/api/notes", function(req, res) {
 
    res.json(notes);
  });

  app.post("/api/notes", function(req, res) {
    // need to read in the json file, then append the req.body to it.
 
   req.body.id = notes.length + 1;

   notes.push(req.body);
   console.log(JSON.stringify(req.body));
  // console.log(req.body);
   fs.writeFile("db/db.json",JSON.stringify(notes), 'utf8', function() { 
     console.log("wrote file.");
   });

   res.end();
  
  });

  app.get("/notes", function(req, res) {
     res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
    
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


