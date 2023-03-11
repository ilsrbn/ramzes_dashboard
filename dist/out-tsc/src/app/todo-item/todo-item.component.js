import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let TodoItemComponent = class TodoItemComponent {
    constructor() {
        this.editClick = new EventEmitter();
        this.deleteClick = new EventEmitter();
    }
    ngOnInit() {
    }
    onEditClick() {
        this.editClick.emit();
    }
    onDeleteClick() {
        this.deleteClick.emit();
    }
};
__decorate([
    Input()
], TodoItemComponent.prototype, "todo", void 0);
__decorate([
    Output()
], TodoItemComponent.prototype, "editClick", void 0);
__decorate([
    Output()
], TodoItemComponent.prototype, "deleteClick", void 0);
TodoItemComponent = __decorate([
    Component({
        selector: 'app-todo-item',
        templateUrl: './todo-item.component.html',
        styleUrls: ['./todo-item.component.scss']
    })
], TodoItemComponent);
export { TodoItemComponent };
//# sourceMappingURL=todo-item.component.js.map