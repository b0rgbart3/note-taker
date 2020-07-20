// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var Journal = require("./classes/journal"); 

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var dataPath = "db/db.json";

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Start by reading in the existing notes from the db
let journal;
var notesRaw = fs.readFileSync(path.resolve("db", "db.json"), "utf8");
if (notesRaw) {
  var notesData = JSON.parse(notesRaw);
  var notesCount = notesData.length;
  journal = new Journal(notesData);
 
} else {
  journal = new Journal();
}
app.journal = journal;

// load in the routes
require("./routes/routes")(app);
    
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


