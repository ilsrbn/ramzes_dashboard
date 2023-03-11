import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhotosComponent} from './photos/photos.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './guard/auth.guard';
import {AddPhotoComponent} from './add-photo/add-photo.component';
import {CategoriesComponent} from './categories/categories.component';
import {EmptyLayoutComponent} from './empty-layout/empty-layout.component';
import {LayoutComponent} from './layout/layout.component';
import {AddCategoryComponent} from './add-category/add-category.component';
import {EditCategoryComponent} from './edit-category/edit-category.component';
import {NonAuthGuardService} from './guard/non-auth.guard';
import {PostsComponent} from './posts/posts.component';
import {AddPostComponent} from './add-post/add-post.component';
import {EditPostComponent} from './edit-post/edit-post.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: EmptyLayoutComponent,
    canActivate: [NonAuthGuardService],
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
      { path: 'categories/add', component: AddCategoryComponent },
      { path: 'categories/:id', component: EditCategoryComponent },
      { path: 'posts', component: PostsComponent, data: { tab: 3 } },
      { path: 'posts/add', component: AddPostComponent },
      { path: 'posts/:id', component: EditPostComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
