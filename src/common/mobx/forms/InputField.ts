import isArray from "lodash/isArray";
import isFunction from "lodash/isFunction";
import { LambdaValue } from "../../helpers";
import { ValueHolder } from "../holders";
import { makeAutoObservable } from "mobx";

type TInputValue = string;

interface IInputEvents {
  onFocus: () => void;
  onBlur: () => void;
  onChangeText: (text: string) => void;
}

/**
 * Поле ввода значения произвольного типа.
 */
export class InputField<TValue = TInputValue> {
  public readonly inputEvents: IInputEvents;
  private _inputValue = new ValueHolder<TInputValue | undefined>(undefined);
  private _errors:
    | string
    | string[]
    | undefined
    | (() => string | string[] | undefined);
  private _warnings:
    | string
    | string[]
    | undefined
    | (() => string | string[] | undefined);
  private _isDisplayErrors: boolean | (() => boolean);
  private _isDisplayWarnings: boolean | (() => boolean);
  private _hintInner?: string | (() => string);

  private _value: TValue | undefined | (() => TValue | undefined);
  private _isValid: boolean | (() => boolean) = false;
  private _isFocused = false;
  private _isChanged = false;
  private _placeholder = new ValueHolder<string | undefined>(undefined);
  private _isVisible = new ValueHolder<boolean>(true);
  private _isEnabled = new ValueHolder<boolean>(true);

  constructor() {
    // default: isValid
    this._isValid = () => !this.errors;
    // default: isDisplayErrors - показываем ошибку, после изменения поля
    this._isDisplayErrors = () => this.isChanged;
    // default: isDisplayWarnings - показываем ошибку, после изменения поля
    this._isDisplayWarnings = () => this.isChanged;

    const self = this;

    this.inputEvents = {
      get onBlur() {
        return self.onBlur;
      },
      get onFocus() {
        return self.onFocus;
      },
      get onChangeText() {
        return self.onChangeText;
      },
    };

    // ❌ @action.bound не использовать! Если использовать, то косячит вызов в дочерних классах через super
    this.onChangeText = this.onChangeText.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setPlaceholder = this.setPlaceholder.bind(this);
    this.setValid = this.setValid.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.setDisplayErrors = this.setDisplayErrors.bind(this);
    this.setHintInner = this.setHintInner.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.setEnabled = this.setEnabled.bind(this);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public get isFocused() {
    return this._isFocused;
  }

  public get inputValue() {
    return this._inputValue.value;
  }

  public setInputValue(inputValue?: LambdaValue<TInputValue | undefined>) {
    this._inputValue.setValue(inputValue);
  }

  public clearChanged() {
    this._isChanged = false;
  }

  public get value() {
    return isFunction(this._value) ? this._value() : this._value;
  }

  public setValue(value?: TValue | undefined | (() => TValue | undefined)) {
    this._value = value;
  }

  public get placeholder() {
    return this._placeholder.value;
  }

  public setPlaceholder(value?: LambdaValue<string | undefined>) {
    this._placeholder.setValue(value);
  }

  public setValid(valid: boolean | (() => boolean)) {
    this._isValid = valid;
  }

  public setErrors(
    errors:
      | string
      | string[]
      | undefined
      | (() => string | string[] | undefined),
  ) {
    this._errors = errors;
  }

  public setWarnings(
    warnings:
      | string
      | string[]
      | undefined
      | (() => string | string[] | undefined),
  ) {
    this._warnings = warnings;
  }

  public get warnings() {
    const warnings = isFunction(this._warnings)
      ? this._warnings()
      : this._warnings;

    return !warnings ? undefined : isArray(warnings) ? warnings : [warnings];
  }

  public get errors() {
    const errors = isFunction(this._errors) ? this._errors() : this._errors;

    return !errors ? undefined : isArray(errors) ? errors : [errors];
  }

  public get isValid() {
    return isFunction(this._isValid) ? this._isValid() : this._isValid;
  }

  public get isChanged() {
    return this._isChanged;
  }

  public get isDisplayErrors() {
    return isFunction(this._isDisplayErrors)
      ? this._isDisplayErrors()
      : !!this._isDisplayErrors;
  }

  public setDisplayErrors(displayErrors: boolean | (() => boolean)) {
    this._isDisplayErrors = displayErrors;
  }

  public get isDisplayWarnings() {
    return isFunction(this._isDisplayWarnings)
      ? this._isDisplayWarnings()
      : !!this._isDisplayWarnings;
  }

  public setDisplayWarnings(displayWarnings: boolean | (() => boolean)) {
    this._isDisplayWarnings = displayWarnings;
  }

  public get hintInner() {
    return isFunction(this._hintInner) ? this._hintInner() : this._hintInner;
  }

  public setHintInner(hintInner?: string | (() => string)) {
    this._hintInner = hintInner;
  }

  public get displayErrors() {
    return this.isDisplayErrors ? this.errors : undefined;
  }

  public get displayError() {
    return this.displayErrors ? this.displayErrors[0] : undefined;
  }

  public get displayWarnings() {
    return this.isDisplayWarnings ? this.warnings : undefined;
  }

  public get displayWarning() {
    return this.displayWarnings ? this.displayWarnings[0] : undefined;
  }

  public get isVisible() {
    return this._isVisible.value;
  }

  public setVisible(value: LambdaValue<boolean>): void {
    this._isVisible.setValue(value);
  }

  public get isEnabled() {
    return this._isEnabled.value;
  }

  public setEnabled(value: LambdaValue<boolean>): void {
    this._isEnabled.setValue(value);
  }

  public onBlur() {
    this._isFocused = false;
  }

  public onFocus() {
    this._isFocused = true;
  }

  public onChangeText(text: string) {
    // Если в поле вручную вносятся изменения
    if (this._isFocused) {
      this._isChanged = true;
    }
    this.setInputValue(text);
  }
}
