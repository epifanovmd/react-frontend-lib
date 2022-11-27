import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { Flex, FlexProps } from "../../common";

export interface ISelectItem {
  key: string | number;
  label: string;

  [key: string]: any;
}

export interface ISelectItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "style">,
    FlexProps {
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
    <Wrap {...rest} $active={active} onClick={handleSetValue}>
      {value}
    </Wrap>
  );
};

const Wrap = styled(Flex)<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#f5f8fa" : "#ffffff")};
  &:hover {
    background: ${({ $active }) => ($active ? "#f5f8fa" : "#f5f8fa90")};
  }

  padding: 10px 19px;
  font: normal normal normal 14px/32px Roboto;
  letter-spacing: 0;
  color: #222222;
  cursor: pointer;
`;
