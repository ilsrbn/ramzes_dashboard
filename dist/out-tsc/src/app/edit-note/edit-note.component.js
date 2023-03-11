import { __decorate } from "tslib";
import { Component } from '@angular/core';
let EditNoteComponent = class EditNoteComponent {
    constructor(route, noteService, router, notificationService) {
        this.route = route;
        this.noteService = noteService;
        this.router = router;
        this.notificationService = notificationService;
    }
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            const idParam = paramMap.get('id');
            this.note = this.noteService.getNote(idParam);
        });
    }
    onFormSubmit(form) {
        this.noteService.updateNote(this.note.id, form.value);
        this.router.navigateByUrl("/notes");
        this.notificationService.show('Note updated!');
    }
    deleteNote() {
        this.noteService.deleteNote(this.note.id);
        this.router.navigateByUrl("/notes");
        this.notificationService.show('Note deleted');
    }
};
EditNoteComponent = __decorate([
    Component({
        selector: 'app-edit-note',
        templateUrl: './edit-note.component.html',
        styleUrls: ['./edit-note.component.scss']
    })
], EditNoteComponent);
export { EditNoteComponent };
//# sourceMappingURL=edit-note.component.js.map