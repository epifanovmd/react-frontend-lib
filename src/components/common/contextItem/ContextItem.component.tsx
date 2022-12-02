import React, { PropsWithChildren, useCallback } from "react";
import { IContextItemProps } from "./ContextItem.types";
import { observer } from "mobx-react-lite";

const _ContextItem = <T extends unknown = unknown>({
  children,
  ctx,
  onClick,
  ...rest
}: PropsWithChildren<IContextItemProps<T>>) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(ctx, event);
    },
    [ctx, onClick],
  );

  return (
    <div onClick={handleClick} {...rest}>
      {children}
    </div>
  );
};

export const ContextItem = observer(_ContextItem) as <
  T extends unknown = unknown,
>(
  props: PropsWithChildren<IContextItemProps<T>>,
) => JSX.Element;
