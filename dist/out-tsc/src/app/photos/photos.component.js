import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PhotosComponent = class PhotosComponent {
    constructor(photoService) {
        this.photoService = photoService;
        this.photos$ = this.photoService.getPhotos();
    }
};
PhotosComponent = __decorate([
    Component({
        selector: 'app-photos',
        templateUrl: './photos.component.html',
        styleUrls: ['./photos.component.scss']
    })
], PhotosComponent);
export { PhotosComponent };
//# sourceMappingURL=photos.component.js.map