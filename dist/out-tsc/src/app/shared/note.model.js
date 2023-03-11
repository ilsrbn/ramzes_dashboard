import { v4 as uuidv4 } from 'uuid';
export class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.id = uuidv4();
    }
}
//# sourceMappingURL=note.model.js.map