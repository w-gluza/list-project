import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableHeaderCellProps {
  /** Header cell content — typically a column title or label. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("th", {
  textAlign: "left",
  fontWeight: 600,
  color: "$gray600",
  padding: "12px 16px",
});

export const TableHeaderCell = ({ children, css }: TableHeaderCellProps) => {
  return <Root css={css}>{children}</Root>;
};

TableHeaderCell.displayName = "TableHeaderCell";
