import { type ReactNode } from "react";
import { styled } from "../../styles/stitches.config";
import type { CSS } from "@stitches/react";

interface TableProps {
  /** Table content (header, body, etc.) */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
  lineHeight: 1.5,
});

export const Table = ({ children, css }: TableProps) => {
  return <Root css={css}>{children}</Root>;
};

Table.displayName = "Table";
