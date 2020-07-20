var path = require("path");
var express = require("express");

// Routes
// =============================================================
module.exports = function(app) {

// delete a note with a specific id#
app.delete("/api/notes/:id", function(req,res){
  var id = req.params.id;
  app.journal.removeNote(id);
  res.end();
});

// get the full list of notes
app.get("/api/notes", function(req, res) {
  return res.json(app.journal.getNotes());
});

// post a new note
app.post("/api/notes", function(req, res) {
  var newNote = app.journal.newNote( req.body );
  res.json(newNote);
});

// get the notes HTML file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// for any other request, send the homepage
app.get("*", function(req, res) {
  express.static("public/index.html");  //, [options]
});

}