import { Component } from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {Router} from '@angular/router';
import {zip} from 'rxjs';
import {AdminPhotoService} from '../api';
import {tap, } from 'rxjs/operators';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent {

  constructor(
    private router: Router,
    private photoService: AdminPhotoService,
  ) {
  }

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
    const observablesArray = []
    for (const nzFile of this.fileList) {
      const file = nzFile as any
      delete file.thumbUrl
      const formData = new FormData();
      formData.append('file', file);
      observablesArray.push(this.photoService.createOptimizedWebpPhoto({ formData: { file } }))
    }
    zip(observablesArray).pipe(tap(() => this.router.navigateByUrl('/app/photos'))).subscribe()
  }

}
