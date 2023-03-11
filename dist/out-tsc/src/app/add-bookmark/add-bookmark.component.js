import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
let AddBookmarkComponent = class AddBookmarkComponent {
    constructor(bookmarkService, router, notificationService) {
        this.bookmarkService = bookmarkService;
        this.router = router;
        this.notificationService = notificationService;
    }
    ngOnInit() {
    }
    onFormSubmit(form) {
        const { name, url } = form.value;
        const bookmark = new Bookmark(name, url);
        this.bookmarkService.addBookmark(bookmark);
        this.router.navigateByUrl("/bookmarks");
        this.notificationService.show('Created bookmark!');
    }
};
AddBookmarkComponent = __decorate([
    Component({
        selector: 'app-add-bookmark',
        templateUrl: './add-bookmark.component.html',
        styleUrls: ['./add-bookmark.component.scss']
    })
], AddBookmarkComponent);
export { AddBookmarkComponent };
//# sourceMappingURL=add-bookmark.component.js.map