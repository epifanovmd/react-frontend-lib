import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { IInputProps, Input } from "../input";
import { ISelectItem, ISelectItemProps, SelectItem } from "./SelectItem";
import {
  isArray,
  isObject,
  useBooleanState,
  useCompoundProps,
  useOutsideClick,
} from "../../../common";
import { IPlaceholderProps, Placeholder } from "../placeholder";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

import "./index.scss";
import "./transition.scss";
import { ChevronDownIcon, ChevronUpIcon } from "react-frontend-lib-icons";

export interface ISelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onBlur" | "onChange"> {
  cnPrefix?: string;
  error?: string;
  items: ISelectItem[];
  name?: string;
  onBlur?: (name: string) => void;
  onChange?: (value: ISelectItem, name?: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  renderItem?: (props: ISelectItemProps) => JSX.Element;
  renderValue?: (selected?: ISelectItem | ISelectItem[]) => JSX.Element;
  selected?: ISelectItem | ISelectItem[];
  touch?: boolean;
}

interface ISelectStatic {
  Empty: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Icon: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Item: (props: Omit<ISelectItemProps, "item" | "value" | "active">) => null;
  List: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Placeholder: (props: IPlaceholderProps) => null;
  Search: (props: IInputProps) => null;
  Transition: (props: CSSTransitionProps) => null;
  Value: (props: React.HTMLAttributes<HTMLDivElement>) => null;
}

export const _Select: FC<PropsWithChildren<ISelectProps>> & ISelectStatic = ({
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
  cnPrefix,
  className,
  ...rest
}) => {
  const [search, setSearch] = useState("");
  const [blur, setBlur] = useState(false);
  const [open, setOpen, setClose] = useBooleanState(false);

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
    "Search",
    "Icon",
    "Empty",
  );

  const ref = useOutsideClick(() => {
    setClose();
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

  useEffect(() => {
    if (open) {
      setSearch("");
    }
  }, [open]);

  const toggleOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!readOnly) {
        onClick?.(event);
        open ? setClose() : setOpen();

        if (open && !blur) {
          onBlur && name && onBlur(name);
          setBlur(true);
        }
      }
    },
    [readOnly, onClick, open, setClose, setOpen, blur, onBlur, name],
  );

  const handleSetValue = useCallback(
    (value: ISelectItem) => {
      if (!readOnly) {
        innerProps.item?.onSetValue?.(value);

        onChange && onChange(value, name);
        if (open && !blur) {
          onBlur && name && onBlur(name);
          setBlur(true);
        }

        if (open && isObject(selected) && !isArray(selected)) {
          setClose();
        }
      }
    },
    [
      readOnly,
      innerProps.item,
      onChange,
      name,
      open,
      blur,
      selected,
      onBlur,
      setClose,
    ],
  );

  const simpleValue = useMemo(() => {
    if (isArray(selected)) {
      return selected && selected.length > 1
        ? `??????????????: ${selected?.length}`
        : selected?.[0]?.label || "";
    }

    if (isObject(selected)) {
      return selected?.label || "";
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

  const searchClickHandler = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (!readOnly) {
        event.stopPropagation();
        if (innerProps.search?.onClick) {
          innerProps.search.onClick(event);
        }
      }
    },
    [innerProps.search, readOnly],
  );

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);
  }, []);

  const _items = useMemo(
    () =>
      innerProps.search
        ? items.filter(item =>
            search
              ? item.label.toLowerCase().includes(search.trim().toLowerCase())
              : true,
          )
        : items,
    [innerProps.search, items, search],
  );

  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;

  const wrapClassNames = classNames(
    `${prefix}select`,
    { [`${prefix}select__read-only`]: readOnly },
    { [`${prefix}select__error`]: Boolean(touch && error) },
  );

  const iconHandleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (!readOnly) {
        event.stopPropagation();
        innerProps.icon?.onClick?.(event);
        if (!innerProps.icon?.children) {
          open ? setClose() : setOpen();
        } else {
          setClose();
        }
      }
    },
    [innerProps.icon, open, readOnly, setClose, setOpen],
  );

  return (
    <div
      ref={ref}
      {...rest}
      className={classNames(wrapClassNames, className)}
      onClick={toggleOpen}
    >
      {innerProps.search && open && !readOnly && (
        <Input
          autoFocus={true}
          onClick={searchClickHandler}
          onChange={onSearch}
          className={`${prefix}select-input-wrap`}
          {...innerProps.search}
        />
      )}
      {!(innerProps.search && open && !readOnly) && (
        <div
          {...innerProps.value}
          className={classNames(
            `${prefix}select-value`,
            innerProps.value?.className,
          )}
        >
          {renderValue?.(selected) || simpleValue}
        </div>
      )}
      <div
        {...innerProps.icon}
        className={classNames(
          `${prefix}select-icon`,
          innerProps.icon?.className,
        )}
        onClick={iconHandleClick}
      >
        {innerProps.icon?.children ??
          (open && !readOnly ? <ChevronUpIcon /> : <ChevronDownIcon />)}
      </div>
      <Placeholder
        placeholder={placeholder}
        isFocus={(hasValue || (open && !!search)) && !readOnly}
        {...innerProps.placeholder}
      />

      <CSSTransition
        classNames={"select"}
        timeout={0}
        unmountOnExit={true}
        {...innerProps.transition}
        in={open && !readOnly}
      >
        <div
          {...innerProps.list}
          className={classNames(
            `${prefix}select-list`,
            innerProps.list?.className,
          )}
        >
          {_items.map((item: ISelectItem, index) =>
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
                className={classNames(
                  "select-list-item",
                  innerProps.item?.className,
                )}
                key={index}
                active={getActive(item)}
                value={getValue(item)}
                item={item}
                {...innerProps.item}
                onSetValue={handleSetValue}
              />
            ),
          )}
          {!_items.length && (
            <div
              {...innerProps.empty}
              className={classNames(
                `${prefix}select-empty`,
                innerProps.empty?.className,
              )}
            >
              {innerProps.empty?.children || "???????????? ????????"}
            </div>
          )}
        </div>
      </CSSTransition>
      <div
        {...innerProps.error}
        className={classNames(
          `${prefix}select-error`,
          innerProps.error?.className,
        )}
      >
        {!readOnly && touch && error}
      </div>
    </div>
  );
};

_Select.Value = (_p: ComponentProps<typeof _Select.Value>) => null;
_Select.Error = (_p: ComponentProps<typeof _Select.Error>) => null;
_Select.List = (_p: ComponentProps<typeof _Select.List>) => null;
_Select.Item = (_p: ComponentProps<typeof _Select.Item>) => null;
_Select.Placeholder = (_p: ComponentProps<typeof _Select.Placeholder>) => null;
_Select.Transition = (_p: ComponentProps<typeof _Select.Transition>) => null;
_Select.Search = (_p: ComponentProps<typeof _Select.Search>) => null;
_Select.Icon = (_p: ComponentProps<typeof _Select.Icon>) => null;
_Select.Empty = (_p: ComponentProps<typeof _Select.Empty>) => null;

export const Select: typeof _Select = observer(_Select) as any;
