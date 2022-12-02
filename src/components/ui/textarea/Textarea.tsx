import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import RCTextarea, { TextAreaProps } from "rc-textarea";
import { useCompoundProps } from "../../../common";
import { Placeholder } from "../placeholder";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

import "./index.scss";

export interface ITextAreaProps extends TextAreaProps {
  touch?: boolean;
  error?: string;
  cnPrefix?: string;
}

interface ITextAreaStatic {
  Wrap: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Textarea: (props: TextAreaProps) => null;
  Placeholder: typeof Placeholder;
}

const _TextArea: FC<ITextAreaProps> & ITextAreaStatic = ({
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
  className,
  style,
  ...rest
}) => {
  const inputRef = useRef<RCTextarea>(null);
  const innerProps = useCompoundProps(
    { children },
    _TextArea,
    "Wrap",
    "Error",
    "Placeholder",
    "Textarea",
  );

  const [isFloating, setFloating] = useState(!value);

  useEffect(() => {
    setFloating(!!value);
  }, [value]);

  const onAnimationStart = useCallback(
    (event: React.AnimationEvent<HTMLTextAreaElement>) => {
      if (event.animationName === "onAutoFillStart") {
        setFloating(true);
      } else if (event.animationName === "onAutoFillCancel") {
        setFloating(!!(event.target as any).value);
      }
    },
    [],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleClickPlaceholder = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClickWrap = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (innerProps.wrap) {
        innerProps.wrap.onClick?.(event);
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [innerProps.wrap],
  );

  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;

  const wrapClassNames = classNames(
    `${prefix}textarea-wrap`,
    { [`${prefix}textarea-wrap__read-only`]: readOnly },
    { [`${prefix}textarea-wrap__error`]: Boolean(touch && error) },
  );
  const inputClassNames = classNames(`${prefix}textarea`, {
    [`${prefix}textarea__read-only`]: readOnly,
  });
  const errorClassNames = classNames(`${prefix}textarea-error`);

  return (
    <div
      style={style}
      {...innerProps.wrap}
      className={classNames(
        wrapClassNames,
        className,
        innerProps.wrap?.className,
      )}
      onClick={handleClickWrap}
    >
      <RCTextarea
        ref={inputRef}
        {...rest}
        readOnly={readOnly}
        className={classNames(inputClassNames, innerProps.textarea?.className)}
        placeholder={""}
        onBlur={handleBlur}
        onChange={handleChange}
        onAnimationStart={onAnimationStart}
      />
      {!readOnly && (
        <Placeholder
          placeholder={placeholder}
          isFocus={isFloating || !!value}
          {...innerProps.placeholder}
          onClick={handleClickPlaceholder}
        />
      )}
      <div
        {...innerProps.error}
        className={classNames(errorClassNames, innerProps.error?.className)}
      >
        {!readOnly && touch && error}
      </div>
    </div>
  );
};

_TextArea.Wrap = (_p: ComponentProps<typeof _TextArea.Wrap>) => null;
_TextArea.Error = (_p: ComponentProps<typeof _TextArea.Error>) => null;
_TextArea.Textarea = (_p: ComponentProps<typeof _TextArea.Textarea>) => null;
_TextArea.Placeholder = Placeholder;

export const Textarea = observer(_TextArea) as typeof _TextArea;
