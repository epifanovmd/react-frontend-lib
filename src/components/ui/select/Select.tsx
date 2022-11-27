import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { ISelectItem, ISelectItemProps, SelectItem } from "./SelectItem";
import {
  isArray,
  isObject,
  useCompoundProps,
  useOutsideClick,
} from "../../../common";
import { IPlaceholderProps, Placeholder } from "../placeholder";
import { Flex, FlexProps } from "../../common";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { observer } from "mobx-react-lite";

interface IProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onBlur" | "onChange" | "color" | "style"
    >,
    FlexProps {
  name?: string;
  touch?: boolean;
  error?: string;
  readOnly?: boolean;
  items: ISelectItem[];
  selected?: ISelectItem | ISelectItem[];
  placeholder?: string;
  onChange?: (value: ISelectItem, name?: string) => void;
  onBlur?: (name: string) => void;
  renderItem?: (props: ISelectItemProps) => JSX.Element;
  renderValue?: (selected?: ISelectItem | ISelectItem[]) => JSX.Element;
}

interface ISelectStatic {
  Value: (props: React.HTMLAttributes<HTMLDivElement> & FlexProps) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement> & FlexProps) => null;
  List: (props: React.HTMLAttributes<HTMLDivElement> & FlexProps) => null;
  Item: (props: ISelectItemProps) => null;
  Placeholder: (props: IPlaceholderProps) => null;
  Transition: (props: CSSTransitionProps) => null;
}

export const _Select: FC<PropsWithChildren<IProps>> & ISelectStatic = ({
  name,
  onClick,
  touch,
  error,
  readOnly,
  items,
  selected,
  placeholder,
  onChange,
  onBlur,
  renderItem,
  renderValue,
  children,
  ...rest
}) => {
  const [blur, setBlur] = useState(false);
  const [open, setOpen] = useState(false);

  const innerProps = useCompoundProps(
    {
      children,
      items,
    },
    _Select,
    "Value",
    "Error",
    "Placeholder",
    "List",
    "Item",
    "Transition",
  );

  const ref = useOutsideClick(() => {
    setOpen(false);
    if (open && !blur) {
      onBlur && name && onBlur(name);
      setBlur(true);
    }
  });

  useEffect(() => {
    if (blur) {
      onBlur && name && onBlur(name);
      setBlur(true);
    }
    // eslint-disable-next-line
  }, [blur]);

  const toggleOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      setOpen(state => !state);

      if (open && !blur) {
        onBlur && name && onBlur(name);
        setBlur(true);
      }
    },
    [onClick, open, blur, onBlur, name],
  );

  const handleSetValue = useCallback(
    (value: ISelectItem) => {
      onChange && onChange(value, name);
      setOpen(false);
      if (open && !blur) {
        onBlur && name && onBlur(name);
        setBlur(true);
      }
    },
    [open, onBlur, name, blur, onChange],
  );

  const simpleValue = useMemo(() => {
    if (isArray(selected)) {
      return selected && selected.length > 1
        ? `Выбрано: ${selected?.length}`
        : selected?.[0]?.label || "";
    }

    if (isObject(selected)) {
      return selected?.key || "";
    }

    return "";
  }, [selected]);

  const getActive = useCallback(
    (item: ISelectItem) => {
      if (isArray(selected)) {
        return !!selected?.some(_item => _item.key === item.key);
      }

      if (isObject(selected)) {
        return selected?.key === item.key;
      }

      return false;
    },
    [selected],
  );

  const hasValue = useMemo(() => {
    if (selected) {
      if (isArray(selected)) {
        return selected.length > 0;
      }

      if (isObject(selected)) {
        return !!selected?.key;
      }
    }

    return false;
  }, [selected]);

  const getValue = useCallback((item: ISelectItem) => item.label, []);

  return (
    <Wrap
      ref={ref}
      {...rest}
      $isError={!!(touch && error)}
      onClick={toggleOpen}
    >
      <Value {...innerProps.value}>
        {renderValue?.(selected) || simpleValue}
      </Value>
      <Placeholder
        {...innerProps.placeholder}
        placeholder={placeholder}
        isFocus={hasValue}
      />

      <CSSTransition
        classNames={"select select-fade"}
        timeout={0}
        unmountOnExit={true}
        {...innerProps.transition}
        in={open}
      >
        <DropdownList {...innerProps.list}>
          {items.map((item: ISelectItem, index) =>
            renderItem ? (
              renderItem({
                active: getActive(item),
                value: getValue(item),
                item,
                onSetValue: handleSetValue,
                ...innerProps.item,
              })
            ) : (
              <SelectItem
                {...innerProps.item}
                key={index}
                active={getActive(item)}
                value={getValue(item)}
                item={item}
                onSetValue={handleSetValue}
              />
            ),
          )}
        </DropdownList>
      </CSSTransition>
      <Error {...innerProps.error}>{!readOnly && touch && error}</Error>
    </Wrap>
  );
};

_Select.Value = (_props: React.HTMLAttributes<HTMLDivElement> & FlexProps) =>
  null;
_Select.Error = (_props: React.HTMLAttributes<HTMLDivElement> & FlexProps) =>
  null;
_Select.List = (_props: React.HTMLAttributes<HTMLDivElement> & FlexProps) =>
  null;
_Select.Item = (_props: ISelectItemProps) => null;
_Select.Placeholder = (_props: IPlaceholderProps) => null;
_Select.Transition = (_props: CSSTransitionProps) => null;

export const Select: typeof _Select = observer(_Select) as any;

const Wrap = styled(Flex)<{ $isError?: boolean }>`
  min-width: 343px;
  min-height: 50px;

  position: relative;
  font: normal normal normal 14px/17px Roboto;
  background: transparent;
  border: 1px solid ${({ $isError }) => ($isError ? "red" : "#0000001f")};
  border-radius: 8px;
  padding: 17px;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const Value = styled(Flex)`
  position: absolute;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: #000;
`;

const DropdownList = styled.section`
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 6px;
  padding: 6px 0;
  z-index: 100;

  background: #ffffff;
  box-shadow: 0 3px 8px #00000026;
  border-radius: 8px;
  width: 100%;
  max-height: 300px;
  overflow: auto;
`;

const Error = styled(Flex)`
  font-size: 11px;
  color: red;
  position: absolute;

  bottom: 0;
  left: 16px;
`;
