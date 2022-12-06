import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { Checkbox, ICheckboxProps } from "./Checkbox";
import { RequiredKeys, useCompoundProps } from "../../../common";

export interface ICheckboxGroupProps<T extends any = unknown>
  extends Omit<ICheckboxProps, "onChange" | "defaultValue" | "value"> {
  defaultValue?: (string | number)[];
  items: RequiredKeys<ICheckboxProps<T>, "value">[];
  onChange?: (value: (string | number)[], ctx?: T) => void;
  value?: (string | number)[];
}

interface ICheckboxGroupStatic {
  Wrap: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
}

export const _CheckboxGroup: FC<PropsWithChildren<ICheckboxGroupProps>> &
  ICheckboxGroupStatic = ({
  items,
  defaultValue,
  value,
  onChange,
  children,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState<(string | number)[]>(
    defaultValue || [],
  );

  const innerProps = useCompoundProps(
    {
      children,
      items,
    },
    _CheckboxGroup,
    "Wrap",
  );

  const handleChange = useCallback(
    (_checked: boolean, _value?: string | number, ctx?: any) => {
      if (value === undefined) {
        if (_checked) {
          setCurrentValue(state => {
            const newValue = [...state, _value!];

            onChange?.(newValue, ctx);

            return newValue;
          });
        } else {
          setCurrentValue(state => {
            const newValue = state.filter(
              item => String(item) !== String(_value),
            );

            onChange?.(newValue, ctx);

            return newValue;
          });
        }
      } else if (_checked) {
        onChange?.([...currentValue, _value!], ctx);
      } else {
        onChange?.(
          currentValue.filter(item => String(item) !== String(_value)),
          ctx,
        );
      }
    },
    [currentValue, onChange, value],
  );

  const checked = useCallback(
    (_value: string | number) => {
      if (value !== undefined) {
        return value.some(item => String(item) === String(_value));
      } else {
        return currentValue.some(item => String(item) === String(_value));
      }
    },
    [currentValue, value],
  );

  return (
    <div {...innerProps.wrap}>
      {items.map((element, index) => (
        <Checkbox
          key={String(element.value) + index}
          checked={checked(element.value)}
          {...element}
          {...rest}
          onChange={handleChange}
        >
          {innerProps.$children}
        </Checkbox>
      ))}
    </div>
  );
};

_CheckboxGroup.Wrap = (_p: ComponentProps<typeof _CheckboxGroup.Wrap>) => null;

export const CheckboxGroup = _CheckboxGroup as (<T>(
  _props: PropsWithChildren<ICheckboxGroupProps<T>>,
) => JSX.Element) &
  ICheckboxGroupStatic;
