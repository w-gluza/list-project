import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../../styles/stitches.config";

export interface PageContainerProps {
  /** Content to render inside the container. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("div", {
  width: "100%",
  maxWidth: "960px",
  margin: "0 auto",
  padding: "20px 16px",
});

export const PageContainer = ({ children, css }: PageContainerProps) => {
  return <Root css={css}>{children}</Root>;
};

PageContainer.displayName = "PageContainer";
