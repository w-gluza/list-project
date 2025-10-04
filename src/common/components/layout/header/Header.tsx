import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../../styles/stitches.config";

export interface HeaderProps {
  /** Content to render inside the header. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Header = ({ children, css }: HeaderProps) => {
  return <Root css={css}>{children}</Root>;
};

Header.displayName = "Header";
