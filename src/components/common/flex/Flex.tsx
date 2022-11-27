import * as React from "react";
import { FC, forwardRef } from "react";
import { useFlexProps } from "./useFlexProps";
import { FlexComponentProps } from "./types";

export const Flex = forwardRef<HTMLDivElement, FlexComponentProps>(
  (props, ref) => {
    const { ownProps, style } = useFlexProps(props);

    return <div ref={ref} style={style} {...ownProps} />;
  },
);

export const Col = forwardRef<HTMLDivElement, FlexComponentProps>(
  (props: FlexComponentProps, ref) => <Flex ref={ref} col={true} {...props} />,
);
export const Row = forwardRef<HTMLDivElement, FlexComponentProps>(
  (props: FlexComponentProps, ref) => <Flex ref={ref} row={true} {...props} />,
);
