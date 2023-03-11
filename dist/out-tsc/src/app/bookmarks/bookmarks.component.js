import { __decorate } from "tslib";
import { Component } from '@angular/core';
let BookmarksComponent = class BookmarksComponent {
    constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
    }
    ngOnInit() {
        this.bookmarks = this.bookmarkService.getBookmarks();
    }
};
BookmarksComponent = __decorate([
    Component({
        selector: 'app-bookmarks',
        templateUrl: './bookmarks.component.html',
        styleUrls: ['./bookmarks.component.scss']
    })
], BookmarksComponent);
export { BookmarksComponent };
//# sourceMappingURL=bookmarks.component.js.map