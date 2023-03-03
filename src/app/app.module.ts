import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';
import { BookmarkTileComponent } from './bookmark-tile/bookmark-tile.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { ManageBookmarksComponent } from './manage-bookmarks/manage-bookmarks.component';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';
import { NotificationComponent } from './notification/notification.component';
import { PhotosComponent } from './photos/photos.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { ApiClient } from './api';
import { LoginComponent } from './login/login.component';
import {HttpClientModule, HttpRequest} from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import {NgOptimizedImage, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ObserveElementDirective } from './directive/intersection-observer.directive';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import { CategoriesComponent } from './categories/categories.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { LayoutComponent } from './layout/layout.component';

registerLocaleData(en);

export function tokenGetter(request?: HttpRequest<any>) {
  return localStorage.getItem('authBearer')
}

const options: JwtModuleOptions = {
  config: {
    tokenGetter,
    allowedDomains: ['localhost:3005']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BookmarksComponent,
    TodosComponent,
    NotesComponent,
    BookmarkTileComponent,
    AddNoteComponent,
    NoteCardComponent,
    EditNoteComponent,
    TodoItemComponent,
    AddTodoComponent,
    EditTodoComponent,
    AddBookmarkComponent,
    ManageBookmarksComponent,
    EditBookmarkComponent,
    NotificationComponent,
    PhotosComponent,
    AddPhotoComponent,
    LoginComponent,
    ObserveElementDirective,
    CategoriesComponent,
    EmptyLayoutComponent,
    LayoutComponent
  ],
  imports: [
    NzTagModule,
    NzIconModule,
    NzCardModule,
    NzUploadModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ApiClient,
    HttpClientModule,
    JwtModule.forRoot(options),
    NgOptimizedImage,
    CdkVirtualScrollViewport,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
