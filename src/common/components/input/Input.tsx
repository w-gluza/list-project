import { type InputHTMLAttributes, forwardRef, useId } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text displayed above the input. */
  label?: string;
  /** Optional validation error message. */
  error?: string;
  /** Optional helper text shown when there’s no error. */
  helperText?: string;
  /** Test id for queries in tests. */
  dataTestId?: string;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Wrapper = styled("label", { display: "grid", gap: 6 });

const Row = styled("div", {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
});

const LabelEl = styled("div", {
  fontSize: 14,
  fontWeight: 600,
  color: "$black",
});

const Message = styled("span", {
  fontSize: 12,
  minHeight: 16,
  lineHeight: 1.3,
});

const StyledInput = styled("input", {
  width: "100%",
  height: 40,
  padding: "0 12px",
  borderRadius: 8,
  border: "1px solid $surface3",
  backgroundColor: "$white",
  color: "$black",
  transition: "border-color 0.15s ease, background-color 0.15s ease",

  "&:focus-visible": {
    outline: "none",
    borderColor: "$dark1",
  },

  "&[aria-invalid='true']": {
    borderColor: "red",
  },

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className, dataTestId, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const msgId = `${inputId}-msg`;
    const hasError = Boolean(error);
    const message = error ?? helperText ?? "";

    return (
      <Wrapper className={className}>
        {(label || message) && (
          <Row>
            {label ? (
              <LabelEl as="label" htmlFor={inputId}>
                {label}
              </LabelEl>
            ) : (
              <span />
            )}
            <Message
              id={msgId}
              role={hasError ? "alert" : undefined}
              css={{ color: hasError ? "red" : "$dark1" }}
            >
              {message}
            </Message>
          </Row>
        )}
        <StyledInput
          id={inputId}
          ref={ref}
          aria-invalid={hasError}
          aria-describedby={msgId}
          data-testid={dataTestId}
          {...props}
        />
      </Wrapper>
    );
  }
);

Input.displayName = "Input";
