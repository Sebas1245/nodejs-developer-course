const chalk = require('chalk');
const fs = require('fs');

const getNotes = () => {
    return "Getting notes";
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title,
            body,
        })
        saveNotes(notes);
        console.log(chalk.green.inverse.bold('New note added!'));
        
    } else {
        console.log(chalk.red.inverse.bold('Note title taken!'));
    }
}

const removeNote = (title) => {
    try {
        const notes = loadNotes();
        const filteredNotes = notes.filter((note) => note.title !== title);
        if (filteredNotes.length === notes.length) {
            throw Error('Note was not removed because it does not exist!');
        }
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse.bold("Removed note: " + title));
    } catch (e) {
        console.log(chalk.red.inverse.bold(e.message))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blueBright.inverse.bold("Your notes: \n"));
    notes.forEach(note => {
        console.log(chalk.white.bold(note.title));
        console.log(chalk.white(note.body) + '\n');
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(note => note.title === title);
    if (foundNote) {
        console.log(chalk.bold(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse.bold('Note not found!'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote,
    listNotes,
    readNote,
}