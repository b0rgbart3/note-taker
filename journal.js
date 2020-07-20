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
    newNote(noteObject) {
        let thisNote = null;
        if (noteObject) {
            this.idCounter++;
            console.log("ID: " + this.idCounter);
           thisNote = new Note(noteObject.title, noteObject.text, this.idCounter);
           
            this.notes.push(thisNote);
            
            
           // console.log(thisNote);

            fs.writeFile("db/db.json",JSON.stringify(this.notes), function() { 
                
              });
        }
        return thisNote;
    }
}

module.exports = Journal;