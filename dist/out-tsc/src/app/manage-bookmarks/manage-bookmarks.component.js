import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ManageBookmarksComponent = class ManageBookmarksComponent {
    constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
    }
    ngOnInit() {
        this.bookmarks = this.bookmarkService.getBookmarks();
    }
};
ManageBookmarksComponent = __decorate([
    Component({
        selector: 'app-manage-bookmarks',
        templateUrl: './manage-bookmarks.component.html',
        styleUrls: ['./manage-bookmarks.component.scss']
    })
], ManageBookmarksComponent);
export { ManageBookmarksComponent };
//# sourceMappingURL=manage-bookmarks.component.js.map