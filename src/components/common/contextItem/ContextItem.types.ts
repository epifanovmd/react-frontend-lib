import React from "react";

export type IContextItemProps<
  T extends unknown,
  P extends React.HTMLAttributes<HTMLDivElement> = React.HTMLAttributes<HTMLDivElement>,
> = Omit<P, "onClick"> & {
  ctx: T;
  onClick?: (context: T, event: React.MouseEvent<HTMLDivElement>) => void;
};
