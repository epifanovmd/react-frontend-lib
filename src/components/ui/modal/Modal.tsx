import "./transition.scss";

import React, { FC, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import styled from "styled-components";
import {
  useCompoundProps,
  useKeyPress,
  useOutsideClick,
} from "../../../common";
import { observer } from "mobx-react-lite";
import { Flex, FlexProps } from "../../common";

interface IModalProps {
  disablePortal?: boolean;
  open?: boolean;
  onClose?: () => void;
  children?: any;

  overlayClose?: boolean;
  escapeClose?: boolean;
}

interface IModalStatic {
  Transition: (props: Partial<CSSTransitionProps>) => null;
  Overlay: (props: FlexProps) => null;
  Content: (props: FlexProps) => null;
}

const _Modal: FC<IModalProps> & IModalStatic = ({
  disablePortal,
  open,
  onClose,
  overlayClose,
  escapeClose,
  children,
}) => {
  const modalRef = useRef<any>();
  const innerProps = useCompoundProps(
    { children },
    _Modal,
    "Overlay",
    "Content",
    "Transition",
  );

  const ref = useOutsideClick(event => {
    if (modalRef.current === event.target && overlayClose) {
      onClose && onClose();
    }
  });

  useKeyPress("Escape", () => {
    escapeClose && onClose && onClose();
  });

  const modal = (
    <CSSTransition
      classNames="modal"
      in={open}
      timeout={300}
      mountOnEnter={true}
      unmountOnExit={true}
      {...innerProps.transition}
    >
      <StyledModal ref={modalRef} {...innerProps.overlay}>
        <Content ref={ref} {...innerProps.content}>
          {innerProps.$children}
        </Content>
      </StyledModal>
    </CSSTransition>
  );

  return disablePortal || typeof document === "undefined"
    ? modal
    : ReactDOM.createPortal(modal, document.getElementById("root")!);
};

_Modal.Overlay = (_props: FlexProps) => null;
_Modal.Content = (_props: FlexProps) => null;
_Modal.Transition = (_props: Partial<CSSTransitionProps>) => null;

export const Modal = observer(_Modal) as typeof _Modal;

const StyledModal = styled(Flex)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(Flex)`
  min-width: 300px;
  min-height: 250px;
  padding: 25px;
  background: white;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
