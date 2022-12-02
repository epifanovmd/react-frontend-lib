import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useBooleanState, useCompoundProps } from "../../../common";
import { Placeholder } from "../placeholder";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

import "./index.scss";
import { EyeIcon, EyeOffIcon } from "react-frontend-lib-icons";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  touch?: boolean;
  error?: string;
  cnPrefix?: string;
}

interface IInputStatic {
  Wrap: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => null;
  RightIcon: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Placeholder: typeof Placeholder;
}

const _Input: FC<PropsWithChildren<IInputProps>> & IInputStatic = ({
  children,
  name,
  touch,
  error,
  value,
  onChange,
  onBlur,
  readOnly,
  placeholder,
  cnPrefix,
  style,
  className,
  type,
  ...rest
}) => {
  const [visible, setVisible, setUnVisible] = useBooleanState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const innerProps = useCompoundProps(
    { children },
    _Input,
    "Wrap",
    "Error",
    "Placeholder",
    "Input",
    "RightIcon",
  );
  const [isFloating, setFloating] = useState(!value);

  useEffect(() => {
    setFloating(!!value);
  }, [value]);

  const onAnimationStart = useCallback(
    (event: React.AnimationEvent<HTMLInputElement>) => {
      if (event.animationName === "onAutoFillStart") {
        setFloating(true);
      } else if (event.animationName === "onAutoFillCancel") {
        setFloating(!!(event.target as any).value);
      }
    },
    [],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      if (event.target.value) {
        setFloating(true);
      } else {
        setFloating(false);
      }
    },
    [onChange],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleClickPlaceholder = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      innerProps.placeholder?.onClick?.(event);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [innerProps.placeholder],
  );

  const handleClickIcon = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      innerProps.rightIcon?.onClick?.(event);
      if (type === "password" && !innerProps.rightIcon?.children) {
        visible ? setUnVisible() : setVisible();
      }
    },
    [innerProps.rightIcon, setUnVisible, setVisible, type, visible],
  );

  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;

  const wrapClassNames = classNames(
    `${prefix}input-wrap`,
    { [`${prefix}input-wrap__read-only`]: readOnly },
    { [`${prefix}input-wrap__error`]: Boolean(touch && error) },
  );
  const inputClassNames = classNames(`${prefix}input`, {
    [`${prefix}input__read-only`]: readOnly,
  });
  const errorClassNames = classNames(`${prefix}input-error`);

  return (
    <div
      style={style}
      {...innerProps.wrap}
      className={classNames(
        wrapClassNames,
        className,
        innerProps.wrap?.className,
      )}
    >
      <input
        ref={inputRef}
        {...rest}
        type={visible ? undefined : type}
        readOnly={readOnly}
        className={classNames(inputClassNames, innerProps.input?.className)}
        placeholder={""}
        onBlur={handleBlur}
        onChange={handleChange}
        onAnimationStart={onAnimationStart}
      />
      {(!!innerProps?.rightIcon || type === "password") && (
        <div
          {...innerProps.rightIcon}
          className={classNames(
            `${prefix}input-right-icon`,
            innerProps.rightIcon?.className,
          )}
          onClick={handleClickIcon}
        >
          {innerProps.rightIcon?.children ??
            (visible ? <EyeIcon /> : <EyeOffIcon />)}
        </div>
      )}
      <Placeholder
        placeholder={placeholder}
        isFocus={isFloating || !!value}
        {...innerProps.placeholder}
        onClick={handleClickPlaceholder}
      />
      <div
        {...innerProps.error}
        className={classNames(errorClassNames, innerProps.error?.className)}
      >
        {!readOnly && touch && error}
      </div>
    </div>
  );
};

_Input.Wrap = (_p: ComponentProps<typeof _Input.Wrap>) => null;
_Input.Error = (_p: ComponentProps<typeof _Input.Error>) => null;
_Input.Input = (_p: ComponentProps<typeof _Input.Input>) => null;
_Input.RightIcon = (_p: ComponentProps<typeof _Input.RightIcon>) => null;
_Input.Placeholder = Placeholder;

export const Input = observer(_Input) as typeof _Input;
