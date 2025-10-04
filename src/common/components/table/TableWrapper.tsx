import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableWrapperProps {
  /** Entire table structure or related content. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("div", {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  padding: "16px",
  overflow: "hidden",
});

export const TableWrapper = ({ children, css }: TableWrapperProps) => {
  return <Root css={css}>{children}</Root>;
};

TableWrapper.displayName = "TableWrapper";
