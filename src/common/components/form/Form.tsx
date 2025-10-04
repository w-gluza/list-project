import type { ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface FormProps {
  /** Form fields and controls. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("form", {
  display: "grid",
  gap: "16px",
});

export const Form = ({
  children,
  css,
  ...props
}: FormProps & React.ComponentProps<"form">) => {
  return (
    <Root css={css} {...props}>
      {children}
    </Root>
  );
};

Form.displayName = "Form";
