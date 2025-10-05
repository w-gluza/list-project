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
  fontSize: "$md",
  lineHeight: "20px",
  fontWeight: "$regular",
  color: "$dark1",
  textAlign: "left",
  padding: "10px 0px",
});

export const TableHeaderCell = ({ children, css }: TableHeaderCellProps) => {
  return <Root css={css}>{children}</Root>;
};

TableHeaderCell.displayName = "TableHeaderCell";
