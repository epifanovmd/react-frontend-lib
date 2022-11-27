import React, { PropsWithChildren, useCallback } from "react";
import { IContextItemProps } from "./ContextItem.types";
import { Flex } from "../flex";
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
    <Flex onClick={handleClick} {...rest}>
      {children}
    </Flex>
  );
};

export const ContextItem = observer(_ContextItem) as <
  T extends unknown = unknown,
>(
  props: PropsWithChildren<IContextItemProps<T>>,
) => JSX.Element;
