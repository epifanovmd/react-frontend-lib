import React, { FC } from "react";
import styled, { css } from "styled-components";
import { useCompoundProps } from "../../../common";
import { Flex, FlexProps } from "../../common";

export interface IPlaceholderProps extends FlexProps {
  isFocus?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

interface IPlaceholderStatic {
  Active: (props: FlexProps) => null;
}

const _Placeholder: FC<IPlaceholderProps> & IPlaceholderStatic = ({
  children,
  isFocus,
  placeholder,
  ...rest
}) => {
  const innerProps = useCompoundProps({ children }, _Placeholder, "Active");

  return (
    <StyledPlaceholder
      {...rest}
      {...(isFocus ? innerProps.active : {})}
      $isFocus={isFocus}
    >
      {placeholder}
    </StyledPlaceholder>
  );
};

_Placeholder.Active = (
  _props: React.HTMLAttributes<HTMLDivElement> & FlexProps,
) => null;

export const Placeholder = _Placeholder;

const StyledPlaceholder = styled(Flex)<{ $isFocus?: boolean }>`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  transition: all 100ms ease-in;
  color: #00000050;
  user-select: none;
  font-size: 14px;

  ${({ $isFocus }) =>
    $isFocus
      ? css`
          top: 0;
          transform: translateY(0);
          font-size: 10px;
        `
      : ""};
`;
