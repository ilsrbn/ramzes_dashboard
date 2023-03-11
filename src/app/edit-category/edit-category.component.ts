import {Component} from '@angular/core';

import {AdminCategoryService, AdminPhotoService, Category} from '../api';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BehaviorSubject, concatMap, merge, Observable, switchMap, zip} from 'rxjs';
import {NgForm} from '@angular/forms';

import {filter, tap} from 'rxjs/operators';
import {NotificationService} from '../shared/notification.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {PhotosStore, SimplePhoto} from './photos.store';
import { isEqual } from 'lodash'


@Component({
  providers: [PhotosStore],
  selector: 'app-edit-category',
  templateUrl: `./edit-category.template.html`,
  animations: [
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EditCategoryComponent {
  category$: Observable<Category> = this.route.paramMap.pipe(
    switchMap( (paramMap: ParamMap) => {
      const id = paramMap.get('id')
      this.id = id
      return this.categoryService.getCategoryById({ id })
    }),
    tap((value) => {
      this.photosStore.loadPhotos()
      this.photosStore.setupPhotos(+this.id)
      this.photosStore.patchState({
        oldCover: value.cover?.id,
        newCover: value.cover?.id
      })
    })
  )
  availablePhotos$ = this.photosStore.availablePhotos$
  categoryPhotos$ = this.photosStore.categoryPhotos$
  cover$ = this.photosStore.cover$
  openedSidebar$ = new BehaviorSubject<boolean>(false)
  showValidationErrors = false;
  id: string;

  constructor(
    private readonly photosStore: PhotosStore,
    private categoryService: AdminCategoryService,
    private photoService: AdminPhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  setCover(id: number) {
    this.photosStore.patchState({
      newCover: id
    })
  }
  handleSubmit(form: NgForm) {
    if (form.invalid) {
      this.showValidationErrors = true
      return
    }

    merge(this.updateCategory(form), this.updatePhotos(), this.updateCover())
      .pipe(
        concatMap(() => {
          this.notificationService.show('Done!')
          return this.router.navigateByUrl('/app/categories')
        })
      ).subscribe()
  }

  updateCategory(form: NgForm) {
    return this.categoryService.editCategoryById(
      {
        id: this.id,
        requestBody:
          {
            title: form.value.title,
            posted: form.value.posted,
            description: form.value.description
          }
      })
  }

  updatePhotos() {
    return zip([this.photosStore.categoryPhotos$, this.category$])
      .pipe(
        filter(([newCategoryPhotosArray, category]) => {
          const newCategoryPhotosIds = new Set(newCategoryPhotosArray.map((photo) => photo.id))
          const oldCategoryPhotosIds = new Set(category.photos.map((photo) => photo.id))
          return !isEqual(newCategoryPhotosIds, oldCategoryPhotosIds)
        }),
        switchMap(([newCategoryPhotosArray]) =>
          this.categoryService
            .attachPhotosToCategory({
              id: this.id,
              requestBody: {
                photos: newCategoryPhotosArray.map((photo) => (photo.id))
              }
            })
        )
      )
  }

  updateCover() {
    return this.photosStore.cover$.pipe(
      filter((value) => value.newCover !== value.oldCover),
      switchMap((value) => this.categoryService.setCover({ categoryId: this.id, photoId: value.newCover.toString() }))
    )
  }

  toggleNavbar() {
    return this.openedSidebar$.next(!this.openedSidebar$.value)
  }

  assignToCategory(newPhoto: SimplePhoto) {
    this.photosStore.patchState((state) => ({
      availablePhotos: state.availablePhotos.filter((photo) => photo.id !== newPhoto.id),
      categoryPhotos: [ ...state.categoryPhotos, newPhoto ]
    }))
  }

  removeFromCategory(oldPhoto: SimplePhoto) {
    this.photosStore.patchState((state) => ({
      availablePhotos: [ ...state.availablePhotos, oldPhoto ],
      categoryPhotos: state.categoryPhotos.filter((photo) => photo.id !== oldPhoto.id),
    }))
  }
}
