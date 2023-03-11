import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PhotoService = class PhotoService {
    constructor(adminPhotoService) {
        this.adminPhotoService = adminPhotoService;
    }
    getPhotos() {
        return this.adminPhotoService.getAllPhotos();
    }
};
PhotoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PhotoService);
export { PhotoService };
//# sourceMappingURL=photo.service.js.map