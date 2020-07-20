var Note = require("./note");
var fs = require("fs");

class Journal {
    constructor(notesData) {
        this.notes = [];
        this.idCounter = 1;
        console.log("Setting the counter.");
        if (notesData) {
            for (let note of notesData ) {
                let thisNote = new Note(note.title, note.text, note.id);
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
    newNote(noteObject) {
        let thisNote = null;
        console.log("in NewNote: " + JSON.stringify( noteObject ));
        if (noteObject) {
            console.log("There is a noteObject." + noteObject.id);
            if (noteObject.id) {
                console.log("looking for existing note:");
                 let existingNote = this.findExistingNote(noteObject.id);
                 if (existingNote) {
                      existingNote.updateNote(noteObject.title, noteObject.text);
                     this.saveNotes();
             } 
        }
        else {
        
            this.idCounter++;
            console.log("ID: " + this.idCounter);
           thisNote = new Note(noteObject.title, noteObject.text, this.idCounter);
           
            this.notes.push(thisNote);
            this.saveNotes();
            
           // console.log(thisNote);

           
        }}
        return thisNote;
    }
    saveNotes() {
        fs.writeFile("db/db.json",JSON.stringify(this.notes), function() { 
                
        });
    }
}

module.exports = Journal;