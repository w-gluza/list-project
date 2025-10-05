import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content (text or icon). */
  children?: ReactNode;
  /** Optional icon element. */
  icon?: ReactNode;
  /** Icon position relative to children. */
  iconPosition?: "start" | "end";
  /** Visual style variant: : "primary" (black) or "secondary" (white w/ border). */
  variant?: "primary" | "secondary";
  /** Size: "lg"=48px, "md"=40px, "sm"=32px. */
  size?: "lg" | "md" | "sm";
  /** Corner radius: "md"=8px, "full"=pill. */
  rounded?: "md" | "full";
  /** Show busy state, disables interaction. */
  loading?: boolean;
  /** Test id for queries in tests. */
  dataTestId?: string;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const StyledButton = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontWeight: "$bold",
  cursor: "pointer",
  lineHeight: 1,
  transition:
    "background-color 0.15s ease, opacity 0.15s ease, border-color 0.15s ease",

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  variants: {
    size: {
      lg: {
        height: "48px",
        padding: "0 24px",
        fontSize: "$md",
        lineHeight: "20px",
        fontFamily: "$primary",
      },

      // Header Buttons
      md: {
        height: "40px",
        padding: "0 16px",
        fontSize: "$sm",
        lineHeight: "18px",
        fontFamily: "$primary",
      },
      // Table Buttons
      sm: {
        height: "32px",
        padding: "0 12px",
        fontSize: "$sm",
        lineHeight: "18px",
        fontFamily: "$primary",
      },
    },
    rounded: {
      md: { borderRadius: "$radius-md" },
      full: { borderRadius: "$radius-full" },
    },
    variant: {
      primary: {
        backgroundColor: "$black",
        color: "$white",
        "&:hover:not(:disabled)": {
          backgroundColor: "$black",
          opacity: 0.8,
        },
      },
      secondary: {
        backgroundColor: "$white",
        color: "$black",
        border: "2px solid $surface3",
        "&:hover:not(:disabled)": { backgroundColor: "$surface2" },
      },
    },
  },
});

const IconSlot = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  lineHeight: 0,
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      iconPosition = "start",
      variant = "primary",
      size = "md",
      rounded = "md",
      loading = false,
      dataTestId,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <StyledButton
        ref={ref}
        type={type}
        data-testid={dataTestId}
        variant={variant}
        size={size}
        rounded={rounded}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={className}
        {...props}
      >
        {icon && iconPosition === "start" && (
          <IconSlot aria-hidden="true">{icon}</IconSlot>
        )}
        {children}
        {icon && iconPosition === "end" && (
          <IconSlot aria-hidden="true">{icon}</IconSlot>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
