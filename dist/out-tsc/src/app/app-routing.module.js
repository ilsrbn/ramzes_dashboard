import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';
import { PhotosComponent } from './photos/photos.component';
const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'photos' },
    { path: 'photos', component: PhotosComponent, data: { tab: 1 } },
    // { path: 'bookmarks', component: BookmarksComponent, data: { tab: 1 } },
    // { path: 'bookmarks/add', component: AddBookmarkComponent },
    // { path: 'bookmarks/manage', component: ManageBookmarksComponent, children: [
    //   { path: ':id', component: EditBookmarkComponent }
    // ] },
    { path: 'todos', component: TodosComponent, data: { tab: 2 } },
    { path: 'todos/add', component: AddTodoComponent },
    { path: 'todos/:id', component: EditTodoComponent },
    { path: 'notes', component: NotesComponent, data: { tab: 3 } },
    { path: 'notes/add', component: AddNoteComponent },
    { path: 'notes/:id', component: EditNoteComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map