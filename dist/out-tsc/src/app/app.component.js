import { __awaiter, __decorate } from "tslib";
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
const baseStyles = style({
    // display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
});
let AppComponent = class AppComponent {
    constructor() {
        this.backgrounds = [
            'https://images.unsplash.com/photo-1434907652076-85f8401482c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920'
        ];
    }
    ngOnInit() {
        this.dateTime = timer(0, 1000).pipe(map(() => {
            return new Date();
        }));
    }
    prepareRoute(outlet) {
        if (outlet.isActivated) {
            const tab = outlet.activatedRouteData['tab'];
            if (!tab)
                return 'secondary';
            return tab;
        }
    }
    changeBGImage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadingBGImage = true;
            const result = yield fetch('https://source.unsplash.com/random/1920x1080', {
                method: 'HEAD'
            });
            const alreadyGot = this.backgrounds.includes(result.url);
            if (alreadyGot) {
                // this is the same image as we currently have, so re-run the function
                return this.changeBGImage();
            }
            this.backgrounds.push(result.url);
        });
    }
    onBGImageLoad(imgEvent) {
        // BG image has loaded, now remove the old BG image from the backgrounds array
        const imgElement = imgEvent.target;
        const src = imgElement.src;
        this.backgrounds = this.backgrounds.filter(b => b === src);
        this.loadingBGImage = false;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
        animations: [
            trigger('routeAnim', [
                transition(':increment', [
                    style({
                        position: 'relative',
                        overflow: 'hidden'
                    }),
                    query(':enter, :leave', [
                        baseStyles
                    ], { optional: true }),
                    // query(':enter', [
                    //   style({ opacity: 0 })
                    // ], { optional: true }),
                    group([
                        query(':leave', [
                            animate('200ms ease-in', style({
                                opacity: 0,
                                transform: 'translateX(-50px)'
                            }))
                        ], { optional: true }),
                        query(':enter', [
                            style({
                                transform: 'translateX(50px)',
                                opacity: 0
                            }),
                            animate('250ms 120ms ease-out', style({
                                opacity: 1,
                                transform: 'translateX(0)'
                            }))
                        ], { optional: true })
                    ])
                ]),
                transition(':decrement', [
                    style({
                        position: 'relative',
                        overflow: 'hidden'
                    }),
                    query(':enter, :leave', [
                        baseStyles
                    ], { optional: true }),
                    // query(':enter', [
                    //   style({ opacity: 0 })
                    // ], { optional: true }),
                    group([
                        query(':leave', [
                            animate('200ms ease-in', style({
                                opacity: 0,
                                transform: 'translateX(50px)'
                            }))
                        ], { optional: true }),
                        query(':enter', [
                            style({
                                transform: 'translateX(-50px)',
                                opacity: 0
                            }),
                            animate('250ms 120ms ease-out', style({
                                opacity: 1,
                                transform: 'translateX(0)'
                            }))
                        ], { optional: true })
                    ])
                ]),
                transition('* => secondary', [
                    style({
                        position: 'relative',
                        // overflow: 'hidden'
                    }),
                    query(':enter, :leave', [
                        baseStyles
                    ], { optional: true }),
                    group([
                        query(':leave', [
                            animate('200ms ease-in', style({
                                opacity: 0,
                                transform: 'scale(0.8)'
                            }))
                        ], { optional: true }),
                        query(':enter', [
                            style({
                                transform: 'scale(1.2)',
                                opacity: 0
                            }),
                            animate('250ms 120ms ease-out', style({
                                opacity: 1,
                                transform: 'scale(1)'
                            }))
                        ], { optional: true })
                    ])
                ]),
                transition('secondary => *', [
                    style({
                        position: 'relative',
                        // overflow: 'hidden'
                    }),
                    query(':enter, :leave', [
                        baseStyles
                    ], { optional: true }),
                    group([
                        query(':leave', [
                            animate('200ms ease-in', style({
                                opacity: 0,
                                transform: 'scale(1.25)'
                            }))
                        ], { optional: true }),
                        query(':enter', [
                            style({
                                transform: 'scale(0.8)',
                                opacity: 0
                            }),
                            animate('250ms 120ms ease-out', style({
                                opacity: 1,
                                transform: 'scale(1)'
                            }))
                        ], { optional: true })
                    ])
                ])
            ]),
            trigger('bgAnim', [
                transition(':leave', [
                    animate(1000, style({
                        opacity: 0
                    }))
                ])
            ]),
            trigger('fadeAnim', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate(250, style({
                        opacity: 1
                    }))
                ]),
                transition(':leave', [
                    animate(250, style({ opacity: 0 }))
                ])
            ])
        ]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map