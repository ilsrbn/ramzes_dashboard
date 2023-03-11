import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let BookmarkTileComponent = class BookmarkTileComponent {
    constructor() { }
    ngOnInit() {
        this.tileIconSrc = this.bookmark.url.origin + '/favicon.ico';
    }
};
__decorate([
    Input()
], BookmarkTileComponent.prototype, "bookmark", void 0);
BookmarkTileComponent = __decorate([
    Component({
        selector: 'app-bookmark-tile',
        templateUrl: './bookmark-tile.component.html',
        styleUrls: ['./bookmark-tile.component.scss']
    })
], BookmarkTileComponent);
export { BookmarkTileComponent };
//# sourceMappingURL=bookmark-tile.component.js.map