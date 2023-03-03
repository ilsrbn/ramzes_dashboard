import {Component} from '@angular/core';
import {AdminPhotoService, Photo} from '../api';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {IntersectionStatus} from '../directive/from-intersection-observer';
import { NotificationService } from '../shared/notification.service'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  currentPage$ = new BehaviorSubject<number>(1)
  photos$: Observable<Photo[]> = this.currentPage$.pipe(
    switchMap((currentPage) => this.photoService.getAllPhotos(1, 20 * currentPage)),
    map((res) => res.data)
  )
  constructor(
    private notificationService: NotificationService,
    private photoService: AdminPhotoService
  ) {}

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1)
  }

  onVisibilityChanged(e: IntersectionStatus) {
    console.log(e);
    if (e === IntersectionStatus.Visible) { this.nextPage() }
  }

  trackBy(index: number, element: Photo) {
    return element.id
  }

  handleDelete(id: number) {
    this.photoService.deletePhotoById(id.toString()).subscribe(() => {
      this.currentPage$.next(this.currentPage$.value)
      this.notificationService.show('Photo deleted!', 1500)
    })
  }

  toggleVisibility(id: number) {
    this.photoService.togglePhotoPublicationStatus(id.toString()).subscribe(() => {
      this.currentPage$.next(this.currentPage$.value)
    })
  }

}
