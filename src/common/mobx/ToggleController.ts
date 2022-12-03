import { action, makeAutoObservable, observable } from "mobx";

export class ToggleController<T = any> {
  public isOpen = false;
  public context?: T;

  constructor(isOpen: boolean = false) {
    this.isOpen = isOpen;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public close(): void {
    this.isOpen = false;
    this.context = undefined;
  }

  public open(context?: T): void {
    this.context = context;
    this.isOpen = true;
  }

  public toggle(context?: T): void {
    this.set(!this.isOpen, context);
  }

  public set(isOpen: boolean, context?: T): void {
    if (isOpen) {
      this.open(context);
    } else {
      this.close();
    }
  }
}
