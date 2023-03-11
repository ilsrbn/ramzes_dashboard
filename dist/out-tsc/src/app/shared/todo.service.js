import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
let TodoService = class TodoService {
    constructor() {
        this.todos = [];
        this.loadState();
        this.storageListenSub = fromEvent(window, 'storage')
            .subscribe((event) => {
            if (event.key === 'todos')
                this.loadState();
        });
    }
    ngOnDestroy() {
        if (this.storageListenSub)
            this.storageListenSub.unsubscribe();
    }
    getTodos() {
        return this.todos;
    }
    getTodo(id) {
        return this.todos.find(t => t.id === id);
    }
    addTodo(todo) {
        this.todos.push(todo);
        this.saveState();
    }
    updateTodo(id, updatedTodoFields) {
        const todo = this.getTodo(id);
        Object.assign(todo, updatedTodoFields);
        this.saveState();
    }
    deleteTodo(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index == -1)
            return;
        this.todos.splice(index, 1);
        this.saveState();
    }
    saveState() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    loadState() {
        try {
            const todosInStorage = JSON.parse(localStorage.getItem('todos'));
            if (!todosInStorage)
                return;
            this.todos.length = 0; // clear the todos array (while keeping the reference)
            this.todos.push(...todosInStorage);
        }
        catch (e) {
            console.log('There was an error retrieving the todos from localStorage');
            console.log(e);
        }
    }
};
TodoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map