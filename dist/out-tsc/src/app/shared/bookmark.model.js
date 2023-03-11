import { v4 as uuidv4 } from 'uuid';
export class Bookmark {
    constructor(name, url) {
        this.id = uuidv4();
        this.url = new URL(url);
        if (!name)
            name = this.url.hostname;
        this.name = name;
    }
}
//# sourceMappingURL=bookmark.model.js.map