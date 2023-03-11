import { __decorate } from "tslib";
import { Component } from '@angular/core';
let EditTodoComponent = class EditTodoComponent {
    constructor(route, todoService, router, notificationService) {
        this.route = route;
        this.todoService = todoService;
        this.router = router;
        this.notificationService = notificationService;
    }
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            const todoId = paramMap.get('id');
            this.todo = this.todoService.getTodo(todoId);
        });
    }
    onFormSubmit(form) {
        if (form.invalid)
            return;
        this.todoService.updateTodo(this.todo.id, form.value);
        this.router.navigateByUrl("/todos");
        this.notificationService.show('Todo updated!');
    }
};
EditTodoComponent = __decorate([
    Component({
        selector: 'app-edit-todo',
        templateUrl: './edit-todo.component.html',
        styleUrls: ['./edit-todo.component.scss']
    })
], EditTodoComponent);
export { EditTodoComponent };
//# sourceMappingURL=edit-todo.component.js.map