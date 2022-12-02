import React, { ComponentProps, FC } from "react";
import { useCompoundProps } from "../../../common";

import "./index.scss";
import classNames from "classnames";

export interface IPlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isFocus?: boolean;
  placeholder?: string;
  cnPrefix?: string;
}

interface IPlaceholderStatic {
  Active: (props: IPlaceholderProps) => null;
}

const _Placeholder: FC<IPlaceholderProps> & IPlaceholderStatic = ({
  children,
  isFocus,
  placeholder,
  cnPrefix,
  ...rest
}) => {
  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;
  const innerProps = useCompoundProps({ children }, _Placeholder, "Active");

  return (
    <div
      {...rest}
      {...(isFocus ? innerProps.active : ({} as any))}
      className={classNames(
        `${prefix}placeholder`,
        { [`${prefix}placeholder__focus`]: isFocus },
        {
          [`${prefix}${innerProps.active?.className || ""}`]:
            isFocus && innerProps.active?.className,
        },
      )}
    >
      {placeholder}
    </div>
  );
};

_Placeholder.Active = (_p: ComponentProps<typeof _Placeholder.Active>) => null;

export const Placeholder = _Placeholder;
