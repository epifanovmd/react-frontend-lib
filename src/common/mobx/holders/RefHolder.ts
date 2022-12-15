import { action, makeAutoObservable } from "mobx";

export class RefHolder<T extends unknown> {
  private _ref?: T;

  constructor() {
    makeAutoObservable(
      this,
      {
        clearRef: action.bound,
        setRef: action.bound,
      },
      {},
    );
  }

  public get ref(): T | undefined {
    return this._ref;
  }

  @action.bound
  public setRef(ref: T) {
    this._ref = ref;
  }

  @action.bound
  public clearRef() {
    this._ref = undefined;
  }
}
