import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableRowProps {
  /** Table cells or nested elements inside a row. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("tr", {
  borderBottom: "1px solid $surface3",

  "&:last-child": {
    borderBottom: "none",
  },
});

export const TableRow = ({ children, css }: TableRowProps) => {
  return <Root css={css}>{children}</Root>;
};

TableRow.displayName = "TableRow";
