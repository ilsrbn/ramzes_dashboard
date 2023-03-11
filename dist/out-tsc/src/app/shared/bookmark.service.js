import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
let BookmarkService = class BookmarkService {
    constructor() {
        this.bookmarks = [];
        this.loadState();
        this.storageListenSub = fromEvent(window, 'storage')
            .subscribe((event) => {
            if (event.key === 'bookmarks')
                this.loadState();
        });
    }
    ngOnDestroy() {
        if (this.storageListenSub)
            this.storageListenSub.unsubscribe();
    }
    getBookmarks() {
        return this.bookmarks;
    }
    getBookmark(id) {
        return this.bookmarks.find(b => b.id === id);
    }
    addBookmark(bookmark) {
        this.bookmarks.push(bookmark);
        this.saveState();
    }
    updateBookmark(id, updatedFields) {
        const bookmark = this.getBookmark(id);
        Object.assign(bookmark, updatedFields);
        this.saveState();
    }
    deleteBookmark(id) {
        const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);
        if (bookmarkIndex == -1)
            return;
        this.bookmarks.splice(bookmarkIndex, 1);
        this.saveState();
    }
    saveState() {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
    loadState() {
        try {
            const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmarks'), (key, value) => {
                if (key == 'url')
                    return new URL(value);
                return value;
            });
            this.bookmarks.length = 0; // clear the bookmarks array (while keeping the reference)
            this.bookmarks.push(...bookmarksInStorage);
        }
        catch (e) {
            console.log('There was an error retrieving the bookmarks from localStorage');
            console.log(e);
        }
    }
};
BookmarkService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BookmarkService);
export { BookmarkService };
//# sourceMappingURL=bookmark.service.js.map