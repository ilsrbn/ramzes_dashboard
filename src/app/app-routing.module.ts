import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { ManageBookmarksComponent } from './manage-bookmarks/manage-bookmarks.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';
import {PhotosComponent} from './photos/photos.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './guard/auth.guard';
import {AddPhotoComponent} from './add-photo/add-photo.component';
import {CategoriesComponent} from './categories/categories.component';
import {EmptyLayoutComponent} from './empty-layout/empty-layout.component';
import {LayoutComponent} from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: EmptyLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ],
  },
  { path: 'app',
    canActivate: [AuthGuardService],
    component: LayoutComponent,
    children: [
      { path: 'photos', component: PhotosComponent, data: { tab: 1 } },
      { path: 'photos/add', component: AddPhotoComponent },
      { path: 'categories', component: CategoriesComponent, data: { tab: 2 } },
      { path: 'todos', component: TodosComponent, data: { tab: 3 } },
      { path: 'todos/add', component: AddTodoComponent },
      { path: 'todos/:id', component: EditTodoComponent },
      { path: 'notes', component: NotesComponent, data: { tab: 4 } },
      { path: 'notes/add', component: AddNoteComponent },
      { path: 'notes/:id', component: EditNoteComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
