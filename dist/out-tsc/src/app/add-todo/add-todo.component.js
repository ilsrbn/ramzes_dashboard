import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Todo } from '../shared/todo.model';
let AddTodoComponent = class AddTodoComponent {
    constructor(todoService, router, notificationService) {
        this.todoService = todoService;
        this.router = router;
        this.notificationService = notificationService;
    }
    ngOnInit() {
    }
    onFormSubmit(form) {
        if (form.invalid)
            return this.showValidationErrors = true;
        const todo = new Todo(form.value.text);
        this.todoService.addTodo(todo);
        this.router.navigateByUrl('/todos');
        this.notificationService.show('Todo created!');
    }
};
AddTodoComponent = __decorate([
    Component({
        selector: 'app-add-todo',
        templateUrl: './add-todo.component.html',
        styleUrls: ['./add-todo.component.scss']
    })
], AddTodoComponent);
export { AddTodoComponent };
//# sourceMappingURL=add-todo.component.js.map