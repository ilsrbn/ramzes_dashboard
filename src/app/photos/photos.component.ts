import {Component} from '@angular/core';
import {AdminPhotoService, Photo} from '../api';
import {BehaviorSubject, combineLatest, Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {IntersectionStatus} from '../directive/from-intersection-observer';
import {NotificationService} from '../shared/notification.service';

type PostedStatus = true | false | undefined

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  currentPage$ = new BehaviorSubject<number>(1)
  postedStatus$ = new BehaviorSubject<PostedStatus>(undefined)
  photos$: Observable<Photo[]> = combineLatest(
    [this.currentPage$, this.postedStatus$]
  ).pipe(
    switchMap(([currentPage, postedStatus]) =>
      this.photoService.getAllPhotos({ page: 1, limit: currentPage * 20 })
        .pipe(
          map((response) => response.data.filter(photo => {
            switch (postedStatus) {
              case undefined:
                return true
              case true:
                return photo.categories.length && photo.categories.some((category) => category.posted === postedStatus)
              case false:
                return !photo.categories.length || photo.categories.every((category) => category.posted === postedStatus)
            }
          }))
        )
    )
  )
  constructor(
    private notificationService: NotificationService,
    private photoService: AdminPhotoService
  ) {}

  private nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1)
  }

  onVisibilityChanged(e: IntersectionStatus) {
    console.log(e);
    if (e === IntersectionStatus.Visible) { this.nextPage() }
  }

  trackBy(index: number, element: Photo) {
    return element.id
  }

  handleDelete = (id: number) => {
    const photoService = this.photoService
    const currentPage$ = this.currentPage$
    const notificationService = this.notificationService
    return () => {
      photoService.deletePhotoById({ id: id.toString() }).subscribe(() => {
        currentPage$.next(this.currentPage$.value)
        notificationService.show('Photo deleted!', 1500)
      })
    }
  }

  textToColor(text: string) {
    return '#' + this.bytesToHex(this.stringToUTF8Bytes(text)).slice(0, 6)
  }

  private stringToUTF8Bytes(text: string) {
    return new TextEncoder().encode(text);
  }

  private bytesToHex(bytes: Uint8Array) {
    return Array.from(
      bytes,
      byte => byte.toString(16).padStart(2, '0')
    ).join('');
  }

}
