import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
let NoteService = class NoteService {
    constructor() {
        this.notes = [];
        this.loadState();
        this.storageListenSub = fromEvent(window, 'storage')
            .subscribe((event) => {
            if (event.key === 'notes')
                this.loadState();
        });
    }
    ngOnDestroy() {
        if (this.storageListenSub)
            this.storageListenSub.unsubscribe();
    }
    getNotes() {
        return this.notes;
    }
    getNote(id) {
        return this.notes.find(n => n.id === id);
    }
    addNote(note) {
        this.notes.push(note);
        this.saveState();
    }
    updateNote(id, updatedFields) {
        const note = this.getNote(id);
        Object.assign(note, updatedFields);
        this.saveState();
    }
    deleteNote(id) {
        const noteIndex = this.notes.findIndex(n => n.id === id);
        if (noteIndex == -1)
            return;
        this.notes.splice(noteIndex, 1);
        this.saveState();
    }
    saveState() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
    loadState() {
        try {
            const notesInStorage = JSON.parse(localStorage.getItem('notes'));
            // if (!notesInStorage) return
            this.notes.length = 0; // clear the notes array (while keeping the reference)
            this.notes.push(...notesInStorage);
        }
        catch (e) {
            console.log('There was an error retrieving the notes from localStorage');
            console.log(e);
        }
    }
};
NoteService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NoteService);
export { NoteService };
//# sourceMappingURL=note.service.js.map