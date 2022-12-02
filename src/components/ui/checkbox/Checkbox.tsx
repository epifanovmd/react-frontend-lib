import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { useBooleanState, useCompoundProps } from "../../../common";
import { CheckBoldIcon } from "react-frontend-lib-icons";

import "./index.scss";

export interface ICheckboxProps<T extends any = unknown>
  extends Partial<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">> {
  title?: string;
  disabled?: boolean;
  cnPrefix?: string;
  onChange?: (checked: boolean, ctx?: T) => void;
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
}

const _Checkbox: FC<PropsWithChildren<ICheckboxProps>> & ICheckboxStatic = ({
  disabled,
  children,
  title,
  cnPrefix = "",
  className,
  style,
  onChange,
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
  );

  const [checked, setChecked, setUnChecked] = useBooleanState();
  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;

  const onToggle = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      checked ? setUnChecked() : setChecked();
      onChange?.(!checked, ctx);
    },
    [checked, onChange, setChecked, setUnChecked, ctx],
  );

  return (
    <div
      style={style}
      {...rest}
      className={classNames(`${prefix}checkbox-wrap`, className)}
      onClick={onToggle}
    >
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

export const Checkbox = observer(_Checkbox) as (<T>(
  props: PropsWithChildren<ICheckboxProps<T>>,
) => JSX.Element) &
  ICheckboxStatic;
