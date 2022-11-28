import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import RCTextarea, { TextAreaProps } from "rc-textarea";
import styled, { css } from "styled-components";
import { useCompoundProps } from "../../../common";
import { Flex, FlexProps, useFlexProps } from "../../common";
import { Placeholder } from "../Placeholder";
import { observer } from "mobx-react-lite";

export interface ITextAreaProps
  extends Omit<
      TextAreaProps,
      | "color"
      | "height"
      | "width"
      | "style"
      | "onChange"
      | "onBlur"
      | "onFocus"
      | "wrap"
    >,
    FlexProps {
  touch?: boolean;
  error?: string;

  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    name?: string,
  ) => void;

  onBlur?: (
    event: React.FocusEvent<HTMLTextAreaElement>,
    name?: string,
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLTextAreaElement>,
    name?: string,
  ) => void;

  textarea?: boolean;

  children?: React.ReactNode;
}

interface ITextAreaStatic {
  Wrap: (props: React.HTMLAttributes<HTMLDivElement> & FlexProps) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement> & FlexProps) => null;
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
  ...rest
}) => {
  const inputRef = useRef<RCTextarea>(null);
  const innerProps = useCompoundProps(
    { children },
    _TextArea,
    "Wrap",
    "Error",
    "Placeholder",
  );

  const { style, ownProps } = useFlexProps(rest);

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
      onChange?.(event, name);
      if (event.target.value) {
        setFloating(true);
      } else {
        setFloating(false);
      }
    },
    [name, onChange],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(event, name);
    },
    [name, onBlur],
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

  return (
    <Wrap
      $isReadOnlyWrap={readOnly}
      $isError={Boolean(touch && error)}
      {...innerProps.wrap}
      onClick={handleClickWrap}
    >
      <StyledTextArea
        ref={inputRef}
        {...ownProps}
        style={style}
        placeholder={""}
        isReadOnly={readOnly}
        onBlur={handleBlur}
        onChange={handleChange}
        onAnimationStart={onAnimationStart}
      />
      {!readOnly && (
        <Placeholder
          placeholder={placeholder}
          {...innerProps.placeholder}
          // @ts-ignore
          onClick={handleClickPlaceholder}
          isFocus={isFloating || !!value}
        />
      )}
      <Error {...innerProps.error}>{!readOnly && touch && error}</Error>
    </Wrap>
  );
};

_TextArea.Wrap = (_props: React.HTMLAttributes<HTMLDivElement> & FlexProps) =>
  null;
_TextArea.Placeholder = (_props => null) as typeof Placeholder;
_TextArea.Error = (_props: React.HTMLAttributes<HTMLDivElement> & FlexProps) =>
  null;

export const Textarea = observer(_TextArea) as typeof _TextArea;

const Wrap = styled(Flex)<{ $isError?: boolean; $isReadOnlyWrap?: boolean }>`
  background: transparent;
  border: 1px solid ${({ $isError }) => ($isError ? "red" : "#0000001f")};

  ${({ $isReadOnlyWrap }) =>
    $isReadOnlyWrap
      ? css`
          cursor: default;
          border: none;
        `
      : ""};
  width: 100%;
  min-width: 320px;
  position: relative;
  cursor: text;
  border-radius: 8px;
`;

const Error = styled(Flex)`
  font-size: 11px;
  color: red;
  position: absolute;

  bottom: 0;
  left: 16px;
`;

const StyledTextArea = styled(RCTextarea)<{ isReadOnly?: boolean }>`
  resize: none;
  overflow: hidden;
  background: transparent;
  outline: none;
  border: none;
  width: 100%;
  border-radius: 0;
  margin: 16px 0;
  font-size: 14px;
  padding: 0 16px;
  display: block;

  @keyframes onAutoFillStart {
    // Workaround to force nesting this keyframe
    0% {
      position: relative;
    }
    100% {
      position: relative;
    }
  }
  @keyframes onAutoFillCancel {
    // Workaround to force nesting this keyframe
    0% {
      position: relative;
    }
    100% {
      position: relative;
    }
  }

  &:-webkit-autofill {
    // Expose a hook for JavaScript when auto fill is shown.
    // JavaScript can capture 'animationstart' events
    animation: onAutoFillStart 5000s linear;
  }

  // Expose a hook for JS onAutoFillCancel
  // JavaScript can capture 'animationstart' events
  animation: onAutoFillCancel 5000s linear;

  &:invalid {
    box-shadow: none;
  }

  &::-webkit-contacts-auto-fill-button,
  &::-webkit-credentials-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    position: absolute;
    right: 0;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }

  ${({ isReadOnly }) =>
    isReadOnly
      ? css`
          padding: 0 0 0 16px;
        `
      : ""};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    border-radius: 8px;
  }
`;
