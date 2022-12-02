import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { ContextItem, IContextItemProps } from "../../common";
import "./index.scss";

export interface IButtonProps<T extends any = unknown>
  extends Partial<IContextItemProps<T>> {
  title?: string;
  disabled?: boolean;
  buttonStyle?:
    | "button-primary"
    | "button-primary-light"
    | "button-green"
    | "button-gray"
    | "button-link";
  cnPrefix?: string;
}

const _Button: FC<PropsWithChildren<IButtonProps>> = ({
  buttonStyle,
  disabled,
  children,
  title,
  cnPrefix = "",
  ...rest
}) => {
  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;
  const buttonClassName = `${prefix}${buttonStyle || "button-primary"}`;

  return (
    <ContextItem
      className={classNames(`${prefix}button`, buttonClassName, {
        [`${buttonClassName}__disabled`]: disabled,
      })}
      {...rest}
      ctx={rest.ctx}
    >
      {title || children}
    </ContextItem>
  );
};

export const Button = observer(_Button) as <T>(
  props: PropsWithChildren<IButtonProps<T>>,
) => JSX.Element;
