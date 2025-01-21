import { NoteObj } from "./NoteObj";

export class TaskObj extends NoteObj {
  private dueDate: any;
  private isComplete: boolean;
  private priority: number;
  // list : List;

  constructor(title: string, priority: number, tags?: string, dueDate?: Date) {
    super(title, tags);
    this.dueDate = dueDate;
    this.priority = priority;

    this.isComplete = false;
  }

  setDueDate(newDueDate: Date) {
    this.dueDate = newDueDate;
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

  // @ts-ignore 
  static fromAPI(data: any): TaskObj {
    return new TaskObj(
      data.title,
      data.priority,
      data.tags,
      new Date(data.dueDate),
    );
  }
}
