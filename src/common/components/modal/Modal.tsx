import { type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { styled } from "../../styles/stitches.config";

export interface ModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Callback when modal open state changes. */
  onOpenChange: (open: boolean) => void;
  /** Optional modal title. */
  title?: string;
  /** Modal content. */
  children: ReactNode;
}

const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: 0,
  backgroundColor: "$overlay",
});

const Content = styled(Dialog.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(560px, 92vw)",
  backgroundColor: "$white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 10px 38px rgba(22,23,24,0.35), 0 10px 20px rgba(22,23,24,0.2)",
});

const Title = styled(Dialog.Title, {
  margin: 0,
  fontSize: "18px",
  fontWeight: 600,
  color: "$black",
});

const CloseX = styled(Dialog.Close, {
  all: "unset",
  position: "absolute",
  top: 12,
  right: 12,
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  color: "$dark1",
  "&:hover": { color: "$black" },
});

export const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          {title && <Title>{title}</Title>}
          <CloseX aria-label="Close">✕</CloseX>
          <div style={{ marginTop: title ? 12 : 0 }}>{children}</div>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.displayName = "Modal";
