import { __decorate } from "tslib";
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
let TodosComponent = class TodosComponent {
    constructor(todoService, router) {
        this.todoService = todoService;
        this.router = router;
    }
    ngOnInit() {
        this.todos = this.todoService.getTodos();
    }
    toggleCompleted(todo) {
        this.todoService.updateTodo(todo.id, { completed: !todo.completed });
    }
    onEditClick(todo) {
        this.router.navigate(['/todos', todo.id]);
    }
    onDeleteClick(todo) {
        this.todoService.deleteTodo(todo.id);
    }
    trackById(index, item) {
        return item.id;
    }
};
TodosComponent = __decorate([
    Component({
        selector: 'app-todos',
        templateUrl: './todos.component.html',
        styleUrls: ['./todos.component.scss'],
        animations: [
            trigger('todoItemAnim', [
                transition(':leave', [
                    animate(200, style({
                        opacity: 0,
                        height: 0,
                        marginBottom: 0
                    }))
                ])
            ])
        ]
    })
], TodosComponent);
export { TodosComponent };
//# sourceMappingURL=todos.component.js.map