
class Note {
    constructor(title, text, id) {  
        this.id = id;
        this.title = title;
        this.text = text;
    }

    updateNote(title,text) {
        this.title = title;
        this.text = text;
    }
}

module.exports = Note;

