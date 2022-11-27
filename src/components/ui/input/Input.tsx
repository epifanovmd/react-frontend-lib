import React, { FC, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useCompoundProps } from "../../../common";
import { Flex, FlexProps, useFlexProps } from "../../common";
import { Placeholder } from "../Placeholder";
import { observer } from "mobx-react-lite";

export interface IInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "color" | "height" | "width" | "style" | "onChange" | "onBlur" | "onFocus"
    >,
    FlexProps {
  touch?: boolean;
  error?: string;

  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    name?: string,
  ) => void;

  onBlur?: (event: React.FocusEvent<HTMLInputElement>, name?: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>, name?: string) => void;

  children?: React.ReactNode;
}

interface IInputStatic {
  Wrap: (props: React.HTMLAttributes<HTMLDivElement> & FlexProps) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement> & FlexProps) => null;
  Placeholder: typeof Placeholder;
}

const _Input: FC<IInputProps> & IInputStatic = ({
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
  const innerProps = useCompoundProps(
    { children },
    _Input,
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
    (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event, name);
    },
    [name, onBlur],
  );

  return (
    <Wrap
      $isReadOnlyWrap={readOnly}
      $isError={Boolean(touch && error)}
      {...innerProps.wrap}
    >
      <div style={{ color: "" }} />
      {!readOnly && (
        <Placeholder
          placeholder={placeholder}
          {...innerProps.placeholder}
          isFocus={isFloating || !!value}
        />
      )}
      <StyledInput
        {...ownProps}
        style={style}
        placeholder={""}
        isReadOnly={readOnly}
        onBlur={handleBlur}
        onChange={handleChange}
        onAnimationStart={onAnimationStart}
      />
      <Error {...innerProps.error}>{!readOnly && touch && error}</Error>
    </Wrap>
  );
};

_Input.Wrap = (_props: React.HTMLAttributes<HTMLDivElement> & FlexProps) =>
  null;
_Input.Placeholder = Placeholder;
_Input.Error = (_props: React.HTMLAttributes<HTMLDivElement> & FlexProps) =>
  null;

export const Input = observer(_Input) as typeof _Input;

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

const StyledInput = styled.input<{ isReadOnly?: boolean }>`
  background: transparent;
  outline: none;
  border: none;
  width: 100%;
  border-radius: 8px;
  padding: 16px;

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
