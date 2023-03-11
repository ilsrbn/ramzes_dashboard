import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let NotificationService = class NotificationService {
    get notifications() {
        return this.notification$.asObservable();
    }
    constructor() {
        this.notification$ = new Subject();
    }
    show(text, duration = 5000) {
        this.notification$.next({ text, duration });
    }
};
NotificationService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NotificationService);
export { NotificationService };
//# sourceMappingURL=notification.service.js.map