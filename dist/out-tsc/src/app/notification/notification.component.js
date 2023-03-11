import { __decorate } from "tslib";
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
let NotificationComponent = class NotificationComponent {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    ngOnInit() {
        this.notificationService.notifications.subscribe((notification) => {
            this.notification = Array(notification);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.notification = null;
            }, notification.duration);
        });
    }
};
NotificationComponent = __decorate([
    Component({
        selector: 'app-notification',
        templateUrl: './notification.component.html',
        styleUrls: ['./notification.component.scss'],
        animations: [
            trigger('notificationAnim', [
                transition(':enter', [
                    style({
                        opacity: 0,
                        transform: 'translateY(5px)'
                    }),
                    animate('150ms 125ms ease-out')
                ]),
                transition(':leave', [
                    animate(125, style({
                        opacity: 0,
                        transform: 'scale(0.85)'
                    }))
                ])
            ])
        ]
    })
], NotificationComponent);
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map