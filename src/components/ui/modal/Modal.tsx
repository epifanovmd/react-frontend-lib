import React, { ComponentProps, FC, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import {
  getScrollbarWidth,
  useCompoundProps,
  useKeyPress,
  useOutsideClick,
} from "../../../common";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

import "./index.scss";
import "./transition.scss";

export interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  disablePortal?: boolean;
  open?: boolean;
  onClose?: () => void;
  overlayClose?: boolean;
  escapeClose?: boolean;
  cnPrefix?: string;
}

interface IModalStatic {
  Transition: (props: Partial<CSSTransitionProps>) => null;
  Overlay: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Content: (props: React.HTMLAttributes<HTMLDivElement>) => null;
}

const _Modal: FC<IModalProps> & IModalStatic = ({
  disablePortal,
  open,
  onClose,
  overlayClose,
  escapeClose,
  cnPrefix,
  className,
  children,
  ...rest
}) => {
  const modalRef = useRef<any>();
  const innerProps = useCompoundProps(
    { children },
    _Modal,
    "Overlay",
    "Content",
    "Transition",
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${getScrollbarWidth()}px`;
    } else {
      document.body.style.overflow = "visible";
      document.body.style.marginRight = "0px";
    }
  }, [open]);

  const ref = useOutsideClick(event => {
    if (modalRef.current === event.target && overlayClose) {
      onClose && onClose();
    }
  });

  useKeyPress("Escape", () => {
    escapeClose && onClose && onClose();
  });

  const prefix = `${classNames({ [`${cnPrefix}-`]: cnPrefix })}`;
  const overlayClassName = `${prefix}modal-overlay`;
  const contentClassName = `${prefix}modal-content`;

  const modal = (
    <CSSTransition
      classNames="modal"
      in={open}
      timeout={300}
      mountOnEnter={true}
      unmountOnExit={true}
      {...innerProps.transition}
    >
      <div
        ref={modalRef}
        {...rest}
        {...innerProps.overlay}
        className={classNames(
          overlayClassName,
          className,
          innerProps.overlay?.className,
        )}
      >
        <div
          ref={ref}
          {...innerProps.content}
          className={classNames(
            contentClassName,
            innerProps.content?.className,
          )}
        >
          {innerProps.$children}
        </div>
      </div>
    </CSSTransition>
  );

  return disablePortal || typeof document === "undefined"
    ? modal
    : ReactDOM.createPortal(modal, document.getElementById("root")!);
};

_Modal.Overlay = (_p: ComponentProps<typeof _Modal.Overlay>) => null;
_Modal.Content = (_p: ComponentProps<typeof _Modal.Content>) => null;
_Modal.Transition = (_p: ComponentProps<typeof _Modal.Transition>) => null;

export const Modal = observer(_Modal) as typeof _Modal;
