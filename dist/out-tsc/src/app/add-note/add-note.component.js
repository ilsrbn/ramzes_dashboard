import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Note } from '../shared/note.model';
let AddNoteComponent = class AddNoteComponent {
    constructor(noteService, router, notificationService) {
        this.noteService = noteService;
        this.router = router;
        this.notificationService = notificationService;
    }
    ngOnInit() {
    }
    onFormSubmit(form) {
        console.log(form);
        if (form.invalid)
            return this.showValidationErrors = true;
        const note = new Note(form.value.title, form.value.content);
        this.noteService.addNote(note);
        this.router.navigateByUrl("/notes");
        this.notificationService.show('Created Note');
    }
};
AddNoteComponent = __decorate([
    Component({
        selector: 'app-add-note',
        templateUrl: './add-note.component.html',
        styleUrls: ['./add-note.component.scss']
    })
], AddNoteComponent);
export { AddNoteComponent };
//# sourceMappingURL=add-note.component.js.map