import { NoteObj } from "./NoteObj";

export class TaskObj extends NoteObj {
  
  private dueDate: any;
  private isComplete: boolean;
  private priority: number;
  private show : boolean;
  // list : List;

  constructor(id : number, user_id : string, title: string, priority: number, tags?: string, dueDate?: Date) {
    super(id, user_id, title, tags);
    this.dueDate = dueDate;
    this.priority = priority;
    this.show = true;
    this.isComplete = false;
  }



  setDueDate(newDueDate: Date) {
    this.dueDate = newDueDate;
  }

  setShow(newShow: boolean) {
    this.show = newShow;
  }

  getShow() : boolean {
    return this.show;
  }

  getDueDate(): Date {
    return this.dueDate;
  }

  getPriority(): number {
    return this.priority;
  }

  setPriority(newPriority: number) {
    this.priority = newPriority;
  }

  getIsCompleted() : boolean {
    return this.isComplete
  }

  // @ts-ignore 
  static fromAPI(data: any): TaskObj {
    return new TaskObj(
      data.id,
      data.user_id,
      data.title,
      data.priority,
      data.tags,
      new Date(data.dueDate),
    );
  }
}
