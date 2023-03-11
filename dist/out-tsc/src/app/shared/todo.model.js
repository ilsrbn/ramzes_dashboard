import { v4 as uuidv4 } from 'uuid';
export class Todo {
    constructor(text) {
        this.text = text;
        this.id = uuidv4();
    }
}
//# sourceMappingURL=todo.model.js.map