import { type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { styled } from "../../styles/stitches.config";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export interface ModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Callback when modal open state changes. */
  onOpenChange: (open: boolean) => void;
  /** Modal title. */
  title: string;
  /** Short accessible description for the modal content. */
  ariaDescription: string;
  /** Modal content. */
  children: ReactNode;
}

const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: 0,
  backgroundColor: "$deepGreen60",
  opacity: 0.6,
});

const Content = styled(Dialog.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(512px, 92vw)",
  backgroundColor: "$white",
  borderRadius: "$radius-lg",
  padding: "32px",
});

const Title = styled(Dialog.Title, {
  margin: 0,
  fontSize: "$lg",
  fontWeight: "$bold",
  color: "$black",
  paddingBottom: "32px",
});

const VisuallyHidden = styled(Dialog.Description, {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

const CloseX = styled(Dialog.Close, {
  all: "unset",
  position: "absolute",
  top: "-60px",
  right: "-60px",
  cursor: "pointer",
  color: "$surface5",
  svg: { width: "48px", height: "48px" },
  "&:hover": { color: "$black" },

  "@media (max-width: 600px)": {
    top: "12px",
    right: "12px",
    svg: { width: "32px", height: "32px" },
  },
});

export const Modal = ({
  open,
  onOpenChange,
  title,
  ariaDescription,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title>{title}</Title>
          <VisuallyHidden>{ariaDescription}</VisuallyHidden>
          <CloseX aria-label="Close">
            <CrossCircledIcon />
          </CloseX>
          <div>{children}</div>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.displayName = "Modal";
