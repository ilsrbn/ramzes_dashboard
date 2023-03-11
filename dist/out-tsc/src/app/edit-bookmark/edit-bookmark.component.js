import { __decorate } from "tslib";
import { Component } from '@angular/core';
let EditBookmarkComponent = class EditBookmarkComponent {
    constructor(bookmarkService, route, router, notificationService) {
        this.bookmarkService = bookmarkService;
        this.route = route;
        this.router = router;
        this.notificationService = notificationService;
    }
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            const bookmarkId = paramMap.get('id');
            this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
        });
    }
    onFormSubmit(form) {
        const { name, url } = form.value;
        this.bookmarkService.updateBookmark(this.bookmark.id, {
            name,
            url: new URL(url)
        });
        this.notificationService.show('Bookmark updated!');
    }
    delete() {
        this.bookmarkService.deleteBookmark(this.bookmark.id);
        this.router.navigate(['../'], { relativeTo: this.route });
        this.notificationService.show('Deleted Bookmark');
    }
};
EditBookmarkComponent = __decorate([
    Component({
        selector: 'app-edit-bookmark',
        templateUrl: './edit-bookmark.component.html',
        styleUrls: ['./edit-bookmark.component.scss']
    })
], EditBookmarkComponent);
export { EditBookmarkComponent };
//# sourceMappingURL=edit-bookmark.component.js.map