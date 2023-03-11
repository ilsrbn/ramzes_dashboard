import {AdminPhotoService, Photo} from '../api';
import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {EMPTY, Observable, pipe, shareReplay, switchMap} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

// Same as Photo, but "categories" include only categories "id", instead of Category
export interface SimplePhoto extends Omit<Photo, 'categories'> {
  categories: Array<number>
}

export interface PhotosState {
  allPhotos: Array<SimplePhoto>,
  categoryPhotos: Array<SimplePhoto>,
  availablePhotos: Array<SimplePhoto>,
  oldCover: number,
  newCover: number,
}

@Injectable()
export class PhotosStore extends ComponentStore<PhotosState> {

  constructor(
    private photosService: AdminPhotoService
  ) {
    super({
      allPhotos: [],
      categoryPhotos: [],
      availablePhotos: [],
      oldCover: -1,
      newCover: -1
    });
  }
  readonly photos$: Observable<SimplePhoto[]> = this.select(state => state.allPhotos)
  categoryPhotos$: Observable<SimplePhoto[]> = this.select(state => state.categoryPhotos)
  availablePhotos$: Observable<SimplePhoto[]> = this.select(state => state.availablePhotos)
  cover$: Observable<{ oldCover: number, newCover: number }> = this.select((state) => ({
    oldCover: state.oldCover,
    newCover: state.newCover
  }))
  loadPhotos = this.effect<void>(
    pipe(
      switchMap(() =>
        this.photosService
          .getAllPhotos({page: 1, limit: 999})
          .pipe(
            shareReplay(1),
            tap({
              next: response =>
                this.patchState(
                  {
                    allPhotos: response.data.map(
                      (photo) =>
                        // Replace whole Category property with just category "id"
                        ({ ...photo, categories: photo.categories.map(({ id }) => id) })
                    )
                  }
                )
            }),
            catchError(() => EMPTY)
          )
      )
    )
  )

  setupPhotos = (categoryId: number) => this.effect<void>(
    pipe(
      switchMap(() =>
        this.photos$
          .pipe(
            tap({
              next: photos => {
                return this.patchState({
                  availablePhotos: photos.filter((photo) => !photo.categories.includes(categoryId)),
                  categoryPhotos: photos.filter((photo) => photo.categories.includes(categoryId))
                })
              }
            }),
            catchError((err) => {
              console.log({ err });
              return EMPTY
            })
          )
      )
    )
  )()
}
