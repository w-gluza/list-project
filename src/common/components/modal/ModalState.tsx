import { styled } from "../../styles/stitches.config";
import { type ReactNode } from "react";

type ModalStateProps = {
  /** Optional loading state (hides children) */
  loading?: boolean;
  /** Optional error message instead of modal content. */
  error?: ReactNode;
};

const StateWrap = styled("div", {
  textAlign: "center",
  padding: "32px 0",
});

const Message = styled("p", {
  fontFamily: "$primary",
  fontSize: "$md",
  margin: 0,
  variants: {
    variant: {
      normal: { color: "$dark1" },
      error: { color: "$danger" },
    },
  },
  defaultVariants: { variant: "normal" },
});

export function ModalState({ loading, error }: ModalStateProps) {
  if (loading) {
    return (
      <StateWrap>
        <Message>Loading...</Message>
      </StateWrap>
    );
  }

  if (error) {
    return (
      <StateWrap>
        <Message variant="error">Failed to load the data 😞</Message>
      </StateWrap>
    );
  }

  return null;
}

ModalState.displayName = "ModalState";
