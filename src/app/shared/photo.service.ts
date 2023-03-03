import { Injectable } from '@angular/core';
import { AdminPhotoService } from '../api';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(
    private adminPhotoService: AdminPhotoService
  ) {
  }
  getPhotos() {
    return this.adminPhotoService.getAllPhotos()
  }

  createPhoto(file: Blob) {
    return this.adminPhotoService.createOptimizedWebpPhoto({ file })
  }
}
