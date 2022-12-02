import React, { FC, useCallback } from "react";
import classNames from "classnames";

export interface ISelectItem {
  key: string | number;
  label: string;

  [key: string]: any;
}

export interface ISelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  item: any;
  value: string;
  onSetValue?: (value: any) => void;
}

export const SelectItem: FC<ISelectItemProps> = ({
  active,
  item,
  onSetValue,
  value,
  ...rest
}) => {
  const handleSetValue = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onSetValue && onSetValue(item);
    },
    [item, onSetValue],
  );

  return (
    <div
      {...rest}
      className={classNames(rest.className, {
        [`${rest.className}__active`]: active,
      })}
      onClick={handleSetValue}
    >
      {value}
    </div>
  );
};
