import { makeAutoObservable, when } from "mobx";
import { isFunction, LambdaValue, resolveLambdaValue } from "../../helpers";

/**
 * Помогает хранить и задавать observable значение.
 * Значение может быть задано через observable функцию.
 */
export class ValueHolder<T> {
  constructor(value: LambdaValue<T>) {
    this._value = value;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  private _value: LambdaValue<T>;

  public get value() {
    return resolveLambdaValue(this._value);
  }

  public get isLambda() {
    return isFunction(this._value);
  }

  public setValue(value: LambdaValue<T>) {
    this._value = value;
  }

  public whenChanged() {
    const value = this.value;

    return when(() => this.value !== value);
  }
}
