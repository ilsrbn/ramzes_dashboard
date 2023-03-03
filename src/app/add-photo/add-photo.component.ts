import { Component, OnInit } from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminPhotoService} from '../api';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

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
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  handleChange() {
    this.router.navigateByUrl('app/photos')
  }

  handleRemove = (file: NzUploadFile) => {
    this.photoService.deletePhotoById(file.response.id).subscribe();
    return true
  }

}
