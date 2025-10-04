import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableCellProps {
  /** Cell content — text, elements, or components. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("td", {
  textAlign: "left",
  fontWeight: 500,
  color: "$black",
  padding: "12px 16px",
});

export const TableCell = ({ children, css }: TableCellProps) => {
  return <Root css={css}>{children}</Root>;
};

TableCell.displayName = "TableCell";
