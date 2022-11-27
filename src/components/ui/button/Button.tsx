import React, { FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react-lite";
import { ContextItem, FlexProps, IContextItemProps } from "../../common";
import { useCompoundProps } from "../../../common";

interface IDisable {
  $disable?: boolean;
}

const Default = styled(ContextItem)<IDisable>`
  padding: 0 16px;
  height: 44px;
  line-height: 42px;
  border: 1px solid #0000;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 15px;
  max-width: 100%;
  outline: 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  background-color: #0c78ed;
  color: #fff;

  :hover {
    background: #2284ef;
    color: #fff;
  }

  ${({ $disable }) =>
    $disable
      ? css`
          background-color: #0c78ed50;
          color: #fff;
          cursor: default;

          :hover {
            background-color: #0c78ed50;
            color: #fff;
          }
        `
      : ""}
`;

const Green = styled(Default)<IDisable>`
  background-color: #36b555;
  color: #fff;

  :hover {
    background: #5bc274;
    color: #fff;
  }

  ${({ $disable }) =>
    $disable
      ? css`
          background-color: #36b55550;
          color: #fff;
          cursor: default;

          :hover {
            background-color: #36b55550;
            color: #fff;
          }
        `
      : ""}
`;

const PrimaryLight = styled(Default)<IDisable>`
  background-color: #e2effd;
  color: #000;

  :hover {
    background: #2284ef;
    color: #fff;
  }

  ${({ $disable }) =>
    $disable
      ? css`
          background-color: #e2effd50;
          color: #00000050;
          cursor: default;

          :hover {
            background-color: #e2effd50;
            color: #00000050;
          }
        `
      : ""}
`;

const Gray = styled(Default)<IDisable>`
  background-color: #efeff3;
  color: #000;

  :hover {
    background: #0000001a;
    color: #000;
  }

  ${({ $disable }) =>
    $disable
      ? css`
          background-color: #efeff350;
          color: #00000050;
          cursor: default;

          :hover {
            background-color: #efeff350;
            color: #00000050;
          }
        `
      : ""}
`;

const Link = styled(Default)<IDisable>`
  background-color: transparent;
  color: #0c78ed;
  height: auto;
  line-height: initial;
  padding: 0;

  :hover {
    background-color: transparent;
    color: #2284ef;
  }

  ${({ $disable }) =>
    $disable
      ? css`
          background-color: transparent;
          color: #0c78ed50;
          cursor: default;

          :hover {
            background-color: transparent;
            color: #0c78ed50;
            cursor: default;
          }
        `
      : ""}
`;

const buttons = {
  Default,
  Primary: Default,
  Green,
  PrimaryLight,
  Gray,
  Link,
};

export interface IButtonProps extends FlexProps {
  title?: string;
  disable?: boolean;
  buttonStyle?: keyof typeof buttons;
}

interface IButtonStatic {
  Disable: (props: IButtonProps) => null;
}

const _Button: FC<PropsWithChildren<IButtonProps>> & IButtonStatic = ({
  buttonStyle,
  disable,
  children,
  title,
  ...rest
}) => {
  const innerProps = useCompoundProps({ children }, _Button, "Disable");
  const Button = buttons[buttonStyle || "Default"];

  return (
    <Button
      {...rest}
      ctx={(rest as any).ctx}
      {...(disable ? innerProps.disable : {})}
      $disable={disable}
    >
      {title || children}
    </Button>
  );
};

_Button.Disable = (_props: IButtonProps) => null;

export const Button = observer(_Button) as (<T>(
  props: PropsWithChildren<
    IButtonProps & Partial<Omit<IContextItemProps<T>, keyof FlexProps>>
  >,
) => JSX.Element) & {
  Disable: (_props: IButtonProps) => null;
};
