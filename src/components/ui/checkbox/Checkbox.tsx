import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { useCompoundProps } from "../../../common";
import { CheckBoldIcon } from "react-frontend-lib-icons";
import { CheckboxGroup } from "./CheckboxGroup";

import "./index.scss";

export interface ICheckboxProps<T extends any = unknown>
  extends Partial<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">> {
  checked?: boolean;
  cnPrefix?: string;
  disabled?: boolean;
  onChange?: (checked: boolean, value?: string | number, ctx?: T) => void;
  title?: string;
  value?: string | number;
  ctx?: T;
}

interface ICheckboxStatic {
  Checkbox: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Active: (props: PropsWithChildren) => null;
  UnActive: (props: PropsWithChildren) => null;
  Title: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Button: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Group: typeof CheckboxGroup;
}

const _Checkbox: FC<PropsWithChildren<ICheckboxProps>> & ICheckboxStatic = ({
  disabled,
  children,
  title,
  cnPrefix = "",
  className,
  style,
  onChange,
  checked,
  value,
  ctx,
  ...rest
}) => {
  const innerProps = useCompoundProps(
    { children },
    _Checkbox,
    "Checkbox",
    "Active",
    "UnActive",
    "Title",
    "Button",
  );

  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;

  const onToggle = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onChange?.(!checked, value, ctx);
    },
    [onChange, checked, value, ctx],
  );

  return (
    <div
      style={style}
      {...rest}
      className={classNames(
        `${prefix}checkbox-wrap`,
        { [`${prefix}checkbox-button`]: !!innerProps.button },
        {
          [`${prefix}checkbox-button__active`]: !!innerProps.button && checked,
        },
        className,
      )}
      onClick={onToggle}
    >
      {!innerProps.button && (
        <div
          {...innerProps.checkbox}
          className={classNames(
            `${prefix}checkbox`,
            {
              [`${prefix}checkbox__active`]: checked,
            },
            innerProps.checkbox?.className,
          )}
        >
          {checked
            ? innerProps.active?.children ?? <CheckBoldIcon />
            : innerProps.unActive?.children}
        </div>
      )}
      {(innerProps.title?.children || title) && (
        <div
          {...innerProps.title}
          className={classNames(
            `${prefix}checkbox-title`,
            innerProps.title?.className,
          )}
        >
          {innerProps.title?.children ?? title}
        </div>
      )}
    </div>
  );
};

_Checkbox.Checkbox = (_p: ComponentProps<typeof _Checkbox.Checkbox>) => null;
_Checkbox.Active = (_p: ComponentProps<typeof _Checkbox.Active>) => null;
_Checkbox.UnActive = (_p: ComponentProps<typeof _Checkbox.UnActive>) => null;
_Checkbox.Title = (_p: ComponentProps<typeof _Checkbox.Title>) => null;
_Checkbox.Button = (_p: ComponentProps<typeof _Checkbox.Button>) => null;
_Checkbox.Group = CheckboxGroup;

export const Checkbox = observer(_Checkbox) as (<T>(
  props: PropsWithChildren<ICheckboxProps<T>>,
) => JSX.Element) &
  ICheckboxStatic;
