import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NotesComponent = class NotesComponent {
    constructor(noteService) {
        this.noteService = noteService;
    }
    ngOnInit() {
        this.notes = this.noteService.getNotes();
    }
};
NotesComponent = __decorate([
    Component({
        selector: 'app-notes',
        templateUrl: './notes.component.html',
        styleUrls: ['./notes.component.scss']
    })
], NotesComponent);
export { NotesComponent };
//# sourceMappingURL=notes.component.js.map