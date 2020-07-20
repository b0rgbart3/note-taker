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
    getNotes() {
        return this.notes;
    }
    findExistingNote(noteID) {
        let found = null;
        found = this.notes.filter( note => {note.id === noteID; });
        if (found) {
            return found[0];
        }
        else return null;
    }
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
    newNote(noteObject) {
        let thisNote = null;
        if (noteObject) {
            if (noteObject.id) {
                 let existingNote = this.findExistingNote(noteObject.id);
                 if (existingNote) {
                      existingNote.updateNote(noteObject.title, noteObject.text);
                     this.saveNotes();
             } 
        }
        else {
            this.idCounter++;
            thisNote = new Note(noteObject.title, noteObject.text, this.idCounter); 
            this.notes.push(thisNote);
            this.saveNotes();
        }}
        return thisNote;
    }
    saveNotes() {
        fs.writeFile("db/db.json",JSON.stringify(this.notes), function() { 
                
        });
    }
}

module.exports = Journal;