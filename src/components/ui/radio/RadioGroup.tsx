import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { IRadioProps, Radio } from "./Radio";
import { RequiredKeys, useCompoundProps } from "../../../common";

export interface IRadioGroupProps<T extends any = unknown>
  extends Omit<IRadioProps, "onChange" | "defaultValue"> {
  defaultValue?: string | number;
  items: RequiredKeys<IRadioProps<T>, "value">[];
  onChange?: (value: string | number, ctx?: T) => void;
}

interface IRadioGroupStatic {
  Wrap: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
}

export const _RadioGroup: FC<PropsWithChildren<IRadioGroupProps>> &
  IRadioGroupStatic = ({
  items,
  defaultValue,
  value,
  onChange,
  children,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState<string | number | undefined>(
    defaultValue,
  );

  const innerProps = useCompoundProps(
    {
      children,
      items,
    },
    _RadioGroup,
    "Wrap",
  );

  const handleChange = useCallback(
    (_checked: boolean, _value?: string | number, ctx?: any) => {
      if (value === undefined) {
        setCurrentValue(_value);
      }
      onChange?.(_value!, ctx);
    },
    [onChange, value],
  );

  return (
    <div {...innerProps.wrap}>
      {items.map((element, index) => (
        <Radio
          key={String(element.value) + index}
          checked={
            value ? value === element.value : currentValue === element.value
          }
          {...element}
          {...rest}
          onChange={handleChange}
        >
          {innerProps.$children}
        </Radio>
      ))}
    </div>
  );
};

_RadioGroup.Wrap = (_p: ComponentProps<typeof _RadioGroup.Wrap>) => null;

export const RadioGroup = _RadioGroup as (<T>(
  _props: PropsWithChildren<IRadioGroupProps<T>>,
) => JSX.Element) &
  IRadioGroupStatic;
