import { Component } from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {Router} from '@angular/router';
import {BehaviorSubject, zip} from 'rxjs';
import {AdminPhotoService} from '../api';
import {tap, } from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
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
export class AddPhotoComponent {

  constructor(
    private router: Router,
    private photoService: AdminPhotoService,
  ) {
  }
  loading$ = new BehaviorSubject<boolean>(false)

  fileList: NzUploadFile[] = []

  handleChange() {
    this.router.navigateByUrl('app/photos')
  }

  handleRemove = (file: NzUploadFile) => {
    this.photoService.deletePhotoById(file.response.id).subscribe();
    return true
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);

    return false;
  };

  handleUpload(): void {
    this.loading$.next(true)
    const observablesArray = []
    for (const nzFile of this.fileList) {
      const file = nzFile as any
      delete file.thumbUrl
      const formData = new FormData();
      formData.append('file', file);
      observablesArray.push(this.photoService.createOptimizedWebpPhoto({ formData: { file } }))
    }
    zip(observablesArray).subscribe(() => {
      this.router.navigateByUrl('/app/photos')
      this.loading$.next(false)
    })
  }

}
