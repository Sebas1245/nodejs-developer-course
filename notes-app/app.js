#! /usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const notesUtils = require('./notes');

// Customize yargs version
yargs.version('1.0.1');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notesUtils.addNote(argv.title, argv.body)
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note tile',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log('Removing the note', argv);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all note',
    handler: function() {
        console.log('Listing a new note');
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a new note',
    handler: function() {
        console.log('Reading a note');
    }
});

yargs.parse()