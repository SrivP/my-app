export class NoteObj {
    private title: string;
  
    private tags: string;
    private complete: boolean;
    // list : List;
  
    constructor(title: string, tags?: string) {
      this.title = title ?? "";
      this.tags = tags ?? "";
      this.complete = false;
    }
  
    setTitle(newTitle: string) {
      this.title = newTitle;
    }
  
  
  
    setTags(newTags: string) {
      this.tags = newTags;
    }
  
    getTitle(): string {
      return this.title;
    }
  
  
  
    getTags(): string {
      return this.tags;
    }
  
    // @ts-ignore 
    static fromAPIH(data: any): NoteObj {
      return new NoteObj(data.title, data.tags);
    }
  }
  