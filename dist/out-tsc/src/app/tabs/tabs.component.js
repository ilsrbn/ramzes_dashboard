import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TabsComponent = class TabsComponent {
    constructor() {
        this.tabs = [
            {
                path: 'photos',
                icon: 'photo'
            },
            {
                path: 'todos',
                icon: 'check'
            },
            {
                path: 'notes',
                icon: 'notes'
            }
        ];
    }
    ngOnInit() {
    }
};
TabsComponent = __decorate([
    Component({
        selector: 'app-tabs',
        templateUrl: './tabs.component.html',
        styleUrls: ['./tabs.component.scss']
    })
], TabsComponent);
export { TabsComponent };
//# sourceMappingURL=tabs.component.js.map