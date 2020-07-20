var Note = require("./note");
var fs = require("fs");

// Journal class stores all of our notes and keeps a running idCounter to make sure
// they all have unique IDs

class Journal {

    // construct a Journal object from an array of JSON notes data
    constructor(notesData) {
        this.notes = [];
        this.idCounter = 1;
        console.log("Setting the counter.");
        if (notesData) {
            for (let note of notesData ) {
                let thisNote = new Note(note.title, note.text, note.id);

                // take note of the highest ID # 
                if (note.id > this.idCounter) {
                    this.idCounter = note.id;
                }
                this.notes.push(thisNote);
            }
        }
    }

    // return the full array of note objects
    getNotes() {
        return this.notes;
    }

    // look through our array to find the note that has a certain ID#
    findExistingNote(noteID) {
        for (var i =0; i < this.notes.length; i++) {
            if (this.notes[i].id == noteID) {
                return this.notes[i];
            }
        }
    }
    // Delete a particular note
    removeNote(id) {
        let indexToRemove = null;
        for (var i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id == id) {
                indexToRemove = i;
            }
        }
        if (indexToRemove != null) {
            this.notes.splice(indexToRemove, 1);
            this.saveNotes();
        }
    }

    // create a new note object
    newNote(noteObject) {
        let thisNote = null;

        // create a new note object for a note that is coming from the db file
        if (noteObject) {
            if (noteObject.id) {
       
                 let existingNote = this.findExistingNote(noteObject.id);
        
                 if (existingNote) {
                      existingNote.updateNote(noteObject.title, noteObject.text);
                     this.saveNotes();
             } 
        }
        else {

        // create a brand new note object that hasen't yet been saved.
        // hence, it needs a fresh, unique ID#
        
            this.idCounter++;
            thisNote = new Note(noteObject.title, noteObject.text, this.idCounter); 
            this.notes.push(thisNote);
            this.saveNotes();
        }}
        return thisNote;
    }

    // save our notes array to the db.json file
    saveNotes() {
        fs.writeFile("db/db.json",JSON.stringify(this.notes), function() { 
                
        });
    }
}

module.exports = Journal;