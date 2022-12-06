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

import "./index.scss";
import { RadioGroup } from "./RadioGroup";

export interface IRadioProps<T extends any = unknown>
  extends Partial<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">> {
  checked?: boolean;
  cnPrefix?: string;
  disabled?: boolean;
  onChange?: (checked: boolean, value?: string | number, ctx?: T) => void;
  title?: string;
  value?: string | number;
  ctx?: T;
}

interface IRadioStatic {
  Radio: (
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
  Group: typeof RadioGroup;
}

const _Radio: FC<PropsWithChildren<IRadioProps>> & IRadioStatic = ({
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
    _Radio,
    "Radio",
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
        `${prefix}radio-wrap`,
        { [`${prefix}radio-button`]: !!innerProps.button },
        { [`${prefix}radio-button__active`]: !!innerProps.button && checked },
        className,
      )}
      onClick={onToggle}
    >
      {!innerProps.button && (
        <div
          {...innerProps.radio}
          className={classNames(
            `${prefix}radio`,
            {
              [`${prefix}radio__active`]: checked,
            },
            innerProps.radio?.className,
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
            `${prefix}radio-title`,
            innerProps.title?.className,
          )}
        >
          {innerProps.title?.children ?? title}
        </div>
      )}
    </div>
  );
};

_Radio.Radio = (_p: ComponentProps<typeof _Radio.Radio>) => null;
_Radio.Active = (_p: ComponentProps<typeof _Radio.Active>) => null;
_Radio.UnActive = (_p: ComponentProps<typeof _Radio.UnActive>) => null;
_Radio.Title = (_p: ComponentProps<typeof _Radio.Title>) => null;
_Radio.Button = (_p: ComponentProps<typeof _Radio.Button>) => null;
_Radio.Group = RadioGroup;

export const Radio = observer(_Radio) as (<T>(
  props: PropsWithChildren<IRadioProps<T>>,
) => JSX.Element) &
  IRadioStatic;
