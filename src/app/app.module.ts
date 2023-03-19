import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { NotificationComponent } from './notification/notification.component';
import { PhotosComponent } from './photos/photos.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { ApiClient } from './api';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ObserveElementDirective } from './directive/intersection-observer.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CategoriesComponent } from './categories/categories.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { LayoutComponent } from './layout/layout.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { CardComponent } from './card/card.component';
import { StoreModule } from '@ngrx/store';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { NgxEditorModule, schema } from 'ngx-editor';
import { FeaturedPhotoInputComponent } from './featured-photo-input/featured-photo-input.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';

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
    NotificationComponent,
    PhotosComponent,
    AddPhotoComponent,
    LoginComponent,
    ObserveElementDirective,
    CategoriesComponent,
    EmptyLayoutComponent,
    LayoutComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    PostsComponent,
    EditPostComponent,
    AddPostComponent,
    FeaturedPhotoInputComponent,
  ],
  imports: [
    NzDividerModule,
    NzRadioModule,
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
    CardComponent,
    StoreModule.forRoot({}, {}),
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    ReactiveFormsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
