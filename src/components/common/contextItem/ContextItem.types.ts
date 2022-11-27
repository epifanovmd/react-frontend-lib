import React from "react";
import { FlexProps } from "../flex";

export interface IContextItemProps<T extends unknown>
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onClick" | "color" | "style"
    >,
    FlexProps {
  ctx: T;
  onClick?: (context: T, event: React.MouseEvent<HTMLDivElement>) => void;
}
