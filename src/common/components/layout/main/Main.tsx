import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../../styles/stitches.config";

export interface MainProps {
  /** Content to render inside the main region. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("main", {
  width: "100%",
  padding: "20px 16px",
});

export const Main = ({ children, css }: MainProps) => {
  return <Root css={css}>{children}</Root>;
};

Main.displayName = "Main";
